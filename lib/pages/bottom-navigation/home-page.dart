import 'package:flutter/material.dart';
import 'package:monle/ble/ble-connection-notifier.dart';
import 'package:monle/utils/widgets/loading/DataLoadingContainer.dart';
import 'package:provider/provider.dart';
import 'package:flutter/foundation.dart';

import '../../styles/colors.dart';
import '../../utils/globals.dart';
import '../new-item-page.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  //Boolean variables
  bool newTagPresented = false;
  bool newTagRegistered = true;

  TextEditingController conditionController = TextEditingController();
  TextEditingController itemNameController = TextEditingController();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }
  @override
  void dispose() {
    // TODO: implement dispose
    conditionController.dispose();
    itemNameController.dispose();
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child:SingleChildScrollView(
          child:Center(
            child:Consumer<BleConnectionNotifier>(builder: (context, bleNotifier, child) {
                return FutureBuilder<Map<String, dynamic>>(
                  future:bagRequests.getBag(),
                    builder: (context, AsyncSnapshot<Map<String, dynamic>> snapshot){
                      if (!snapshot.hasData) {
                        return const Center(
                            child:Text('Ooops! To use the app you need to buy bag first!')
                        );
                      }
                        final data = snapshot.data!;
                        return Container(
                          decoration: const BoxDecoration(),
                          padding: const EdgeInsets.only(
                            left:10,
                            right:10,
                          ),
                          margin: const EdgeInsets.only(
                              left: 20.0,
                              right: 20.0,
                              bottom: 30.0,
                              top:30.0
                          ),
                          child: Column(
                            children: <Widget>[
                              SizedBox(height: 15),
                                FutureBuilder<Uint8List>(
                                  future: bagRequests.getPhoto(),
                                  builder: (context, snapshot) {
                                    if (snapshot.hasData) {
                                      return Image.memory(
                                        snapshot.data!,
                                        width: 200,
                                        height: 200,
                                      );
                                    } else {
                                      return DataLoadingContainer(width: 200, height: 200);
                                    }
                                  },
                                ),
                              SizedBox(height: 30),
                              data['name'].toString().isNotEmpty ? Text(data['name'], style: Theme.of(context).textTheme.displayMedium) : DataLoadingContainer(width: 150, height: 30),
                              SizedBox(height: 50),
                              HomePageItemsBuilder(),
                            ],
                          ),
                        );
                    }
                );
              }
            ),
          ),
        ),
        ),
      );
  }
}

class HomePageItemsBuilder extends StatelessWidget {

  TextEditingController filterController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Consumer<BleConnectionNotifier>(builder: (context, bleNotifier, child) {
      if(!bleNotifier.connected){
        return Text('You are not connected to the bag!');
      }
        return StreamBuilder<List<dynamic>>(
          stream: tagRequests.showTags(context,filterController.text.toString()),
          builder: (context, AsyncSnapshot<List<dynamic>> snapshot) {
            if (!snapshot.hasData) {
              return Text('No tags found. Want to add one?');
            }
              final List<dynamic> data = snapshot.data!;
              return Column(
                children: [
                  Container(
                  decoration: BoxDecoration(
                    color: const Color(whiteSecondColor),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child:  TextField(
                    controller: filterController,
                    decoration: const InputDecoration(
                      hintText: 'Enter item name..',
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.all(16.0),
                    ),
                  ),
                ),
                  SizedBox(height: 25),
                  GridView.builder(
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 15,
                      mainAxisSpacing: 15,
                    ),
                    shrinkWrap: true,
                    itemCount: data.length + 1,
                    physics: const NeverScrollableScrollPhysics(),
                    itemBuilder: (BuildContext ctx, int index) {
                      if(index  <= data.length - 1){
                        return Container(
                              decoration: data[index]["condition"] == true ?  BoxDecoration(borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.blueAccent),color: Theme.of(context).colorScheme.tertiary)
                                  : BoxDecoration(borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.redAccent),color: Theme.of(context).colorScheme.tertiary),
                              child:Center(
                                child:Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: <Widget>[
                                    Image.asset('${data[index]["photo"]}', height:120,width:120),
                                    SizedBox(height: 15),
                                    Text(data[index]["name"],style: Theme.of(context).textTheme.headlineMedium)
                                  ],
                                ),
                              ),
                            );
                      }else{
                        return TextButton(
                          style: TextButton.styleFrom(
                            minimumSize: const Size.fromHeight(30), // NEW
                            backgroundColor: const Color(whiteSecondColor),
                          ),
                          onPressed: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(builder: (context) => const NewItemPage()),
                            );
                          },
                          child:const Text(
                            '+',
                            style: TextStyle(fontSize:32.0,fontWeight: FontWeight.w500, color: Color(darkThirdColor)),
                          ),
                        );
                      }
                    },
                  ),
                ],
              );

            },
        );
    });
  }
}


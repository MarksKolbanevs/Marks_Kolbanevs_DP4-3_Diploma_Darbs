import 'package:flutter/material.dart';
import 'package:monle/ble/ble-connection-notifier.dart';
import 'package:monle/utils/globals.dart';
import 'package:provider/provider.dart';

import '../resources/items-list.dart';
import '../utils/widgets/buttons/primary-rounded-proceed-button.dart';

class NewItemPage extends StatefulWidget {
  const NewItemPage({Key? key}) : super(key: key);

  @override
  State<NewItemPage> createState() => _NewItemPageState();
}

class _NewItemPageState extends State<NewItemPage> {

  TextEditingController nameController = TextEditingController();
  var photo;

  @override
  void initState() {
    super.initState();
    Provider.of<BleConnectionNotifier>(context, listen: false).clearRXCharacteristics();
  }


  Future<void> registerNewTag() async{
    final rxCharacteristicData = Provider.of<BleConnectionNotifier>(context, listen: false).rxCharacteristicData;
    final condition = rxCharacteristicData[1].toLowerCase() == 'true';
    final uuid = rxCharacteristicData[0];
    final name = nameController.text;

    if(name.isEmpty){
      print("No data provided");
      return;
    }
    if(photo.toString().isEmpty){
      print("No path provided");
      return;
    }

    tagRequests.createTag(context, uuid, name, condition, photo);
  }

  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
            child:Consumer<BleConnectionNotifier>(builder: (context, bleNotifier, child) {
              // if(bleNotifier.tagPresence){
              //   print(bleNotifier.tagPresence);
              //   return Center(
              //     child:Column(
              //       mainAxisAlignment: MainAxisAlignment.center,
              //       children: const [
              //         Icon(Icons.accessible_forward_rounded,size:150),
              //         Text('This tag is already registered. Check items page for details'),
              //       ],
              //     ),
              //   );
              // }
              if (!bleNotifier.connected){
                return Center(
                  child:Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Icon(Icons.accessible_forward_rounded,size:150),
                      Text('You are not connected to the bag'),
                    ],
                  ),
                );
              }
              if (bleNotifier.rxCharacteristicData.isEmpty) {
                return Center(
                    child:Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text("Now let’s add your first item!", style: Theme.of(context).textTheme.displayMedium),
                        const SizedBox(height: 50),
                        Image.asset('assets/bag-insert.png', height:300,width:300,color: Theme.of(context).colorScheme.primary,),
                      ],
                    ),
                );
              }else{
                return SingleChildScrollView(
                    child:Center(
                      child:Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: <Widget>[
                          const SizedBox(height: 35),
                          Text("Name it!", style: Theme.of(context).textTheme.displayMedium),
                          const SizedBox(height: 35),
                          Container(
                            decoration: BoxDecoration(
                              border: Border.all(color: const Color(0xff959595), width: 1),
                              borderRadius: BorderRadius.circular(5),
                            ),
                            child: TextField(
                              controller: nameController,
                              decoration: InputDecoration(
                                  border: InputBorder.none,
                                  hintText: 'Name',
                                  hintStyle: Theme.of(context).textTheme.headlineMedium
                              ),
                            ),
                          ),
                          const SizedBox(height: 45),
                          Text("Select an icon", style: Theme.of(context).textTheme.displayMedium),
                          const SizedBox(height: 45),
                          GridView.builder(
                            shrinkWrap: true,
                            physics: NeverScrollableScrollPhysics(), // disable scrolling
                            itemCount: items.length,
                            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              crossAxisSpacing: 10,
                              mainAxisSpacing: 10,
                            ),
                            itemBuilder: (BuildContext context, int index) {
                              return GestureDetector(
                                onTap: () {
                                  setState(() {
                                    photo = items[index]['path']!;
                                  });
                                },
                                child:Container(
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    image: DecorationImage(
                                      image: AssetImage(items[index]['path']!),
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                  child: Center(
                                    child: Text(items[index]['name']!),
                                  ),
                                ),
                              );
                            },
                          ),
                          const SizedBox(height: 65),
                          Center(
                            child: PrimaryRoundedProceedButton(
                              onPressed: registerNewTag,
                            ),
                          ),
                          const SizedBox(height: 65),
                        ],
                      ),
                    ),
                );
              }
              },
            ),
        ),
    );
  }
}

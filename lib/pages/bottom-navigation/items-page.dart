import 'package:flutter/material.dart';
import 'package:monle/utils/globals.dart';
import '../../resources/items-list.dart';
import '../../styles/colors.dart';
import '../new-item-page.dart';
class ItemsPage extends StatefulWidget {
  const ItemsPage({Key? key}) : super(key: key);

  @override
  _ItemsPageState createState() => _ItemsPageState();
}

class _ItemsPageState extends State<ItemsPage>{

  TextEditingController nameController = TextEditingController();

  @override
  void dispose() {
    // TODO: implement dispose
    nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child:SingleChildScrollView(
          child:Center(
            child:Column(
              children: [
                const SizedBox(height: 40),
                Text('Items',style: Theme.of(context).textTheme.displayMedium),
                const SizedBox(height: 30),
                StreamBuilder<List<dynamic>>(
                  stream: tagRequests.showTags(context,''),
                  builder: (context, AsyncSnapshot<List<dynamic>> snapshot) {
                    if (!snapshot.hasData) {
                      return const Text('No tag found. Add your first!');
                    }
                    final List<dynamic> data = snapshot.data!;
                    return ListView.builder(
                      shrinkWrap: true,
                      itemCount: data.length + 1,
                      physics: const NeverScrollableScrollPhysics(),
                      itemBuilder: (BuildContext ctx, index) {
                        if(index  <= data.length - 1) {
                          nameController.text = data[index]['name'];
                          return Container(
                            decoration: data[index]["condition"] == true ?
                            BoxDecoration(
                              borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.blueAccent),
                            ) :
                            BoxDecoration(
                                borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.redAccent)
                            ),
                            margin: const EdgeInsets.only(
                              left: 40.0,
                              right: 40.0,
                              bottom: 30.0,
                            ),
                            padding: const EdgeInsets.only(
                              top:25,
                              left: 50.0,
                              right: 50.0,
                              bottom: 25.0,
                            ),
                            child: Center(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisSize: MainAxisSize.min,
                                children: <Widget>[
                                  TextButton(
                                    onPressed: () => _showBottomSheet(context,data[index]["uuid"]),
                                    child: Image.asset('${data[index]["photo"]}', height: 200, width: 200),
                                  ),
                                  const SizedBox(height: 20),
                                  TextField(
                                    controller: nameController,
                                    decoration: InputDecoration(
                                      filled: true,
                                      fillColor: const Color(0xffbF1F4FB),
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(7),
                                        borderSide: BorderSide.none,
                                      ),
                                      hintText: 'Name',
                                    ),
                                  ),
                                  const SizedBox(height: 10),
                                  //
                                  data[index]["condition"] == true ? Text('Pulled',style:Theme.of(context).textTheme.headlineSmall)
                                  : Text('Pulled',style:Theme.of(context).textTheme.headlineSmall),
                                  //
                                  const SizedBox(height: 20),
                                  TextButton(
                                    style: TextButton.styleFrom(
                                      minimumSize: const Size.fromHeight(30), // NEW
                                      backgroundColor: const Color(blueColor),
                                    ),
                                    onPressed: () => tagRequests.callibrateTag(data[index]["uuid"],context),
                                    child: const Text(
                                      'Callibrate',
                                      style: TextStyle(fontSize: 16.0,
                                          fontWeight: FontWeight.bold,
                                          color: Color(white)),
                                    ),
                                  ),
                                  TextButton(
                                    style: TextButton.styleFrom(
                                      minimumSize: const Size.fromHeight(30), // NEW
                                      backgroundColor: const Color(blueColor),
                                    ),
                                    onPressed: () => tagRequests.updateTagData(data[index]["uuid"],nameController.text.toString(),context),
                                    child: const Text(
                                      'Update',
                                      style: TextStyle(fontSize: 16.0,
                                          fontWeight: FontWeight.bold,
                                          color: Color(white)),
                                    ),
                                  ),
                                  TextButton(
                                    style: TextButton.styleFrom(
                                      minimumSize: const Size.fromHeight(30), // NEW
                                      backgroundColor: const Color(redColor),
                                    ),
                                    onPressed: () => tagRequests.deleteTag(data[index]["uuid"], context),
                                    child: const Text(
                                      'Delete',
                                      style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Color(white)),
                                    ),
                                  ),
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
                              );},
                            child:const Text(
                              '+',
                              style: TextStyle(fontSize:32.0,fontWeight: FontWeight.w500, color: Color(darkThirdColor)),
                            ),
                          );
                        }},
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

void _showBottomSheet(BuildContext context, String id) {
  showModalBottomSheet(
    context: context,
    builder: (BuildContext context) {
      return SingleChildScrollView(
        child:GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(), // disable scrolling
          itemCount: items.length,
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
          ),
          itemBuilder: (BuildContext context, int index) {
            return GestureDetector(
              onTap: () => tagRequests.updateTagPhoto(context,id,items[index]['path']!),
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
      );
    },
  );
}

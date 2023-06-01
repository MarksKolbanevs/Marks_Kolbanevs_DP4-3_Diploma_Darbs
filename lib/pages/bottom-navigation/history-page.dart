import 'package:flutter/material.dart';
import 'package:monle/utils/globals.dart';
import 'package:url_launcher/url_launcher_string.dart';
import '../../styles/colors.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter/foundation.dart';


class HistoryPage extends StatefulWidget {
  const HistoryPage({Key? key}) : super(key: key);

  @override
  _HistoryPageState createState() => _HistoryPageState();
}

class _HistoryPageState extends State<HistoryPage> {

  void _launchUrl() async {

    // String lat = data?.get("latitutde");
    // String long = data?.get("longtitute");
    // String googleUrl = 'https://www.google.com/maps/search/?api=1&query=$lat,$long';
    // await canLaunchUrlString(googleUrl) ? await launchUrlString(googleUrl) : throw 'Could not launch $googleUrl';

    const url = 'https://facebook.com';
    if (await canLaunchUrlString(url)) {
      await launchUrlString(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
          child:FutureBuilder<List<dynamic>>(
              future: historyRequests.showHistory(),
              builder: (context, AsyncSnapshot<List<dynamic>> snapshot) {
                if (!snapshot.hasData) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.history_rounded, size: 150),
                        Text('History is empty'),
                      ],
                    ),
                  );
                }
                final List<dynamic> data = snapshot.data!;
                return ListView.builder(
                  shrinkWrap: true,
                  itemCount: data.length,
                  physics: const NeverScrollableScrollPhysics(),
                  itemBuilder: (BuildContext ctx, index) {
                    if(data.isNotEmpty && index  <= data.length){
                      return SingleChildScrollView(
                        child:HistoryDateContainer(data:data,index:index),
                      );
                    } },
                );
              }
              ),
        ),
    );
  }
}

class HistoryDateContainer extends StatelessWidget{

  final List<dynamic> data;
  var index;

  HistoryDateContainer({required this.data,required this.index});


  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(
        left:10,
        right: 10,
      ), child: Column(
      children: [
        const SizedBox(height: 15),
        Text("${data[index]["dateTime"]["day"]}.${data[index]["dateTime"]["month"]}",style:Theme.of(context).textTheme.displayMedium?.copyWith(fontWeight: FontWeight.w400)),
        Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(4),
              color:Theme.of(context).colorScheme.tertiary,
            ),
            padding: const EdgeInsets.only(
                top:10,
                bottom: 10,
                left:15,
                right:15
            ),
            child:HistoryExpansionTile(long:data[index]['location']['longitude'],lat:data[index]['location']['latitude'],image: "${data[index]['tag']['photo']}", name: "${data[index]['tag']['name']}", dateTime: "${data[index]["dateTime"]["hour"]}:${data[index]["dateTime"]["minutes"]}:${data[index]["dateTime"]["seconds"]}"),
        ),
      ],
    ),
    );
  }
}

class HistoryExpansionTile extends StatelessWidget implements PreferredSizeWidget {
  final String image;
  final String name;
  final String dateTime;

  final double lat;
  final double long;

  HistoryExpansionTile({required this.image, required this.name,required this.dateTime, required this.lat, required this.long});

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      //backgroundColor: Theme.of(context).colorScheme.secondary.withOpacity(0.15),
      tilePadding: const EdgeInsets.only(
          left: 0,
          right: 0
      ),
      // childrenPadding: const EdgeInsets.only(
      //     bottom: 35
      // ),
      trailing: Icon(Icons.keyboard_arrow_down_rounded, color: Theme.of(context).colorScheme.primary.withOpacity(0.15)),
      title: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Row(
            children: [
              Image.asset(image, height: 40, width: 40),
              const SizedBox(width: 10),
              Text(name, style: Theme.of(context).textTheme.displaySmall),
            ],
          ),
          Text(dateTime,style: Theme.of(context).textTheme.displaySmall),
        ],
      ),
      initiallyExpanded: false,
      children: [
        SizedBox(
          width:700,
          height: 400,
          child:MapScreen(lat:lat, long:long),
        )
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class MapScreen extends StatelessWidget {
  final double? lat;
  final double? long;

  MapScreen({required this.lat, required this.long});

  @override
  Widget build(BuildContext context) {
    return GoogleMap(
      initialCameraPosition: CameraPosition(
        target: LatLng(lat ?? 0.0, long ?? 0.0),
        zoom: 12,
      ),
      markers: _buildMarkers(),
    );
  }

  Set<Marker> _buildMarkers() {
    final markers = <Marker>{
      Marker(
        markerId: MarkerId('marker1'),
        position: LatLng(lat ?? 0.0, long ?? 0.0),
        infoWindow: InfoWindow(title: 'Marker 1'),
      ),
    };

    return markers;
  }
}






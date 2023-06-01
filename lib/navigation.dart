import 'package:flutter/material.dart';
import 'package:monle/ble/ble-connection-notifier.dart';
import 'package:monle/pages/bottom-navigation/settings/settings-page.dart';
import 'package:monle/utils/widgets/alert-sceens/disabled-bluetooth-alert.dart';
import 'package:monle/utils/widgets/alert-sceens/disabled-location-alert.dart';
import 'package:provider/provider.dart';
import 'pages/bottom-navigation/home-page.dart';
import 'pages/bottom-navigation/history-page.dart';
import 'pages/bottom-navigation/items-page.dart';
import 'package:monle/styles/colors.dart';
import 'package:flutter/foundation.dart';

class Navigation extends StatefulWidget {
  const Navigation({Key? key}) : super(key: key);

  @override
  _NavigationState createState() => _NavigationState();
}

class _NavigationState extends State<Navigation> {

  int _currentIndex = 0;
  final PermissionChecker permissionChecker = PermissionChecker();


  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      final locationPermission =  await permissionChecker.checkForLocationPermission();
      final bluetoothPermission = await permissionChecker.checkForBluetoothPermission();
      if(!locationPermission){
        disabledLocationAlert(context);
      }
      if(!bluetoothPermission){
        disabledBluetoothAlert(context);
      }
    });
    super.initState();
  }

  final List<Widget> _children = [const HomePage(),const ItemsPage(),const HistoryPage(),const SettingsPage()];

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async {
        // Add your reload logic here
      },
        child:Scaffold(
          body: _children[_currentIndex],
          bottomNavigationBar: BottomNavigationBar(
            type: BottomNavigationBarType.fixed,
            //type: BottomNavigationBarType.shifting,
            onTap: onTabTapped,
            currentIndex: _currentIndex,
            unselectedItemColor: const Color(whiteSecondColor),
            showSelectedLabels: false,
            showUnselectedLabels: false,
            elevation: 0,
            items: const <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                icon: Icon(Icons.home_outlined,size: 28),
                label: 'Home',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.icecream_outlined,size: 28),
                label: 'Items',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.history,size: 28),
                label: 'History',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.settings_outlined,size: 28),
                label: 'Settings',
              ),
            ],
          ),
        ),
    );
  }
}
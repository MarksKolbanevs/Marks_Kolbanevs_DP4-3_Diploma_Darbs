import 'package:flutter/material.dart';
import 'package:monle/ble/ble-connection-notifier.dart';
import 'package:provider/provider.dart';

class BagScanningPage extends StatefulWidget {
  const BagScanningPage({Key? key}) : super(key: key);

  @override
  _BagScanningPageState createState() => _BagScanningPageState();
}

class _BagScanningPageState extends State<BagScanningPage> with WidgetsBindingObserver {

  @override
  void initState() {
    super.initState();
    Provider.of<BleConnectionNotifier>(context, listen: false).startScan();
  }

  @override
  void dispose() {
    super.dispose();
    print('dispose worked in bag scanning page');
  }

  void _navigateToNewItemPage(BuildContext context) {
      //Provider.of<BleConnectionNotifier>(context, listen: false).clearRXCharacteristics();
      //Redirecting to the navigation
      Navigator.pushNamed(context, '/new-item');
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<BleConnectionNotifier>(
      builder: (context, bleConnectionNotifier, child) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (bleConnectionNotifier.connected) {
            _navigateToNewItemPage(context);
          }
        });
        return Scaffold(
          body: SafeArea(
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Image.asset('assets/loading.gif', height: 100, width: 100),
                  SizedBox(
                    width: 195,
                    child: Text(
                      'Wait while searching you bag',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.displaySmall?.copyWith(
                        fontWeight: FontWeight.normal,
                      ),
                    ),
                  ),
                  Text(
                    'Turn on the bag',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.normal,
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
import 'package:flutter/material.dart';
import 'package:monle/resources/socket_methods.dart';
import 'package:monle/utils/globals.dart';
import 'package:monle/utils/widgets/app-bars/settings-section-app-bar.dart';
import 'package:monle/utils/widgets/buttons/primary-rounded-proceed-button.dart';

class HelpPage extends StatefulWidget {
  const HelpPage({Key? key}) : super(key: key);

  @override
  _HelpPageState createState() => _HelpPageState();
}

class _HelpPageState extends State<HelpPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SettingsSectionAppBar(sectionName: 'Help'),
      body: Center(
        child: PrimaryRoundedProceedButton(onPressed: () => SocketMethods().createRoom()),
      ),
    );
  }
}

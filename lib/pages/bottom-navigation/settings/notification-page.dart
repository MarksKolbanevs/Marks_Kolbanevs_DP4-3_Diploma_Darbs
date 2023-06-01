import 'package:flutter/material.dart';

import '../../../utils/widgets/app-bars/settings-section-app-bar.dart';

class NotificationPage extends StatefulWidget {
  const NotificationPage({Key? key}) : super(key: key);

  @override
  _NotificationPageState createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SettingsSectionAppBar(sectionName: 'Notifications'),
      body: Container(
        // Your Widget Tree Here
      ),
    );
  }
}

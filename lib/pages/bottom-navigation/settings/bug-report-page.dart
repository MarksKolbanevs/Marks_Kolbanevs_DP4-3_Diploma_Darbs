import 'package:flutter/material.dart';
import 'package:monle/styles/colors.dart';
import 'package:flutter/foundation.dart';
import 'package:monle/utils/widgets/buttons/primary-rounded-proceed-button.dart';
import 'package:monle/utils/widgets/containers/shadow-container.dart';

import '../../../utils/globals.dart';
import '../../../utils/widgets/app-bars/settings-section-app-bar.dart';

class BugReportPage extends StatefulWidget {
  const BugReportPage({Key? key}) : super(key: key);

  @override
  _BugReportPageState createState() => _BugReportPageState();
}

@override
TextEditingController bugController = TextEditingController();
TextEditingController titleController = TextEditingController();

class _BugReportPageState extends State<BugReportPage> {


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SettingsSectionAppBar(sectionName: 'Bug Report'),
      body: SafeArea(
          child:Padding(
            padding: const EdgeInsets.only(
                left:20,
                right:20
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ShadowedContainer(
                    padding: EdgeInsets.zero,
                    child: TextField(
                      controller: titleController,
                      keyboardType: TextInputType.multiline, // Shows a multiline keyboard
                      decoration: const InputDecoration(
                        contentPadding: EdgeInsets.symmetric(vertical: 15),
                        hintText: 'Title', // Placeholder text
                        border: OutlineInputBorder(), // Adds a border around the input
                      ),
                    )
                ),
                SizedBox(height: 15),
                ShadowedContainer(
                  padding: EdgeInsets.zero,
                  child: TextField(
                    controller: bugController,
                    maxLines: 10, // Set the maximum number of lines to 10
                    decoration: const InputDecoration(
                      labelText: 'Report a bug',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                PrimaryRoundedProceedButton(onPressed: () => bugRequests.reportBug(context, titleController.text, bugController.text)),
              ],
            ),
          ),
      ),
    );
  }
}

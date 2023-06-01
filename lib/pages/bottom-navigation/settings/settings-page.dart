import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:monle/pages/bottom-navigation/settings/FAQ-page.dart';
import 'package:monle/pages/bottom-navigation/settings/password-change-page.dart';
import 'package:monle/styles/colors.dart';
import 'package:monle/utils/globals.dart';
import 'package:monle/utils/widgets/buttons/settings-section.dart';
import 'package:monle/utils/widgets/containers/shadow-container.dart';
import 'package:monle/utils/widgets/future-builders/settings-user-info-builder.dart';

import 'bug-report-page.dart';
import 'help/help-page.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:SafeArea(
        child:Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              SettingsUserInfoBuilder(),
              const SizedBox(height: 20),
              Padding(
                  padding: const EdgeInsets.only(
                    left: 5
                  ),
                child:Text(
                    'GENERAL',
                    style:Theme.of(context).textTheme.displaySmall
                ),
              ),
              const SizedBox(height: 15),
              ShadowedContainer(
                  padding: const EdgeInsets.only(
                      left: 15,
                      right: 30,
                      top:8,
                      bottom:8
                  ),
                  child:SettingsSectionButton(
                    icon: Icons.lock_outline,
                    sectionName: 'Change password',
                    onPressed: () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => PasswordChangePage()),
                    ),
                  )
              ),
              const SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.only(
                    left: 5
                ),
                child:Text('FEEDBACK', style:Theme.of(context).textTheme.displaySmall),
              ),
              const SizedBox(height: 15),
              ShadowedContainer(
                  padding: const EdgeInsets.only(
                      left: 15,
                      right: 30,
                      top:8,
                      bottom:8
                  ),
                  child: Column(
                    children: [
                      SettingsSectionButton(
                          icon: Icons.bug_report_outlined,
                          sectionName: 'Bug report',
                          onPressed: () => Navigator.of(context).push(
                            MaterialPageRoute(builder: (context) => const BugReportPage()),
                          ),
                      ),
                      SettingsSectionButton(
                        icon: Icons.chat_bubble_outline_rounded,
                        sectionName: 'Get a help',
                        onPressed:() => Navigator.of(context).push(
                          MaterialPageRoute(builder: (context) => const HelpPage()),
                        ),
                      ),
                      SettingsSectionButton(
                          icon: Icons.question_mark_rounded,
                          sectionName: 'FAQ',
                          onPressed:() => Navigator.of(context).push(
                            MaterialPageRoute(builder: (context) => FAQPage()),
                          ),
                      ),
                      GestureDetector(
                          onTap: () => authRequests.clearJwtToken(context),
                          child:const Text('Log out', style: TextStyle(fontSize:12.0,fontWeight: FontWeight.bold, color: Color(redColor)))
                      ),
                    ],
                  ),
              ),
          ],
          ),
        ),
      ),
    );
  }
}
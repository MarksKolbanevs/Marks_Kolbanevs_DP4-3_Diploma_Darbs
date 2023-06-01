import 'package:flutter/material.dart';
import 'package:monle/utils/globals.dart';
import 'package:monle/utils/widgets/app-bars/settings-section-app-bar.dart';
import 'package:monle/utils/widgets/expansion-tiles/settings-section-faq-expansion-tile.dart';

class PasswordChangePage extends StatefulWidget {
  @override
  _PasswordChangePage createState() => _PasswordChangePage();
}

class _PasswordChangePage extends State<PasswordChangePage> {
  @override

  TextEditingController currentPasswordController = TextEditingController();
  TextEditingController newPasswordController = TextEditingController();
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: SettingsSectionAppBar(sectionName: 'Change password'),
      body: SafeArea(
        child:Center(
          child:Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.key, size: 200),
              Text('Reset password', style:Theme.of(context).textTheme.displayMedium),
              SizedBox(height: 25),
              Text('Enter your password below, we are being extra safe', style:Theme.of(context).textTheme.displaySmall),
              Column(
                children: [
                  TextField(
                    controller: currentPasswordController,
                    decoration: InputDecoration(
                        //border: InputBorder.none,
                        hintText: 'Current password',
                        hintStyle: Theme.of(context).textTheme.headlineMedium
                    ),
                  ),
                  TextField(
                    controller: newPasswordController,
                    decoration: InputDecoration(
                        //border: InputBorder.none,
                        hintText: 'New password',
                        hintStyle: Theme.of(context).textTheme.headlineMedium
                    ),
                  ),
                ],
              ),
              TextButton(onPressed: () => userRequests.changePassword(context,currentPasswordController.text.toString(),newPasswordController.text.toString()), child: Text('Save'))
            ],
          ),
        ),
      ),
    );
  }
}

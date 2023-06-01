import 'package:flutter/material.dart';
import 'package:monle/styles/colors.dart';
import 'package:monle/utils/globals.dart';
import 'package:monle/utils/widgets/app-bars/settings-section-app-bar.dart';
import 'package:monle/utils/widgets/text-fields/settings-account-section-text-field.dart';
import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';


class AccountPage extends StatefulWidget {
  const AccountPage({Key? key}) : super(key: key);

  @override
  _AccountPageState createState() => _AccountPageState();
}

class _AccountPageState extends State<AccountPage> {

  @override
  final _formKey = GlobalKey<FormState>();
  Map<String, String> _formData = {};

  TextEditingController firstNameController = TextEditingController();
  TextEditingController secondNameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController phoneController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SettingsSectionAppBar(sectionName: 'Account'),
      body: SingleChildScrollView(
        child:FutureBuilder<Map<String, dynamic>>(
            future:userRequests.getUser(),
            builder: (context,AsyncSnapshot<Map<String, dynamic>> snapshot){
              if(!snapshot.hasData){
                return Text('No data');
              }
              final data = snapshot.data!;
              firstNameController.text = data['name'];

              if(data['email'] != null){
                emailController.text = data['email'].toString();
              }
              if(data['phone'] != null){
                phoneController.text = data['phone'].toString();
              }
              passwordController.text = '******';
              return SafeArea(
                child:Container(
                  margin: EdgeInsets.only(left: 35,right: 35),
                  child:Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            TextButton(
                              onPressed: () {},
                              child: Text('Cancel', style:Theme.of(context).textTheme.headlineMedium),
                            ),
                            TextButton(
                                onPressed: () => userRequests.uploadPhoto(context),
                                child: ClipOval(
                                  child: FutureBuilder<Uint8List>(
                                    future: userRequests.getPhoto(),
                                    builder: (context, snapshot) {
                                      if (snapshot.hasData) {
                                        return Image.memory(
                                          snapshot.data!,
                                          width: 100,
                                          height: 100,
                                        );
                                      } else {
                                        return CircularProgressIndicator();
                                      }
                                    },
                                  ),
                                ),
                            ),
                            TextButton(
                              onPressed: () {
                                if (_formKey.currentState?.validate() ?? false) {
                                  _formKey.currentState?.save();
                                  userRequests.updateUser(_formData,context);
                                  // Do something with the form data
                                }},
                              child: Text(
                                'Save',
                                style:Theme.of(context).textTheme.headlineMedium?.copyWith(
                                  color:Theme.of(context).colorScheme.secondary, // change text color to red
                                  letterSpacing: 0.5, // increase letter spacing
                                ),
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 25),
                        SettingsAccountSectionTextField(
                          controller: firstNameController,
                          hintText: "Name",
                          onSaved: (value) {
                            _formData['name'] = value;},
                        ),
                        SettingsAccountSectionTextField(
                          controller: emailController,
                          hintText: "Email",
                          onSaved: (value) {
                            _formData['email'] = value;},
                        ),
                        // data['emailVerificated'] ?
                        // GestureDetector(
                        //     onTap: () => authRequests.sendForVerify(context,data['email']),
                        //     child:Text('Verify', style:  TextStyle(fontSize:12.0,fontWeight: FontWeight.bold, color: Color(goldColor)))
                        // ) : null,
                        SettingsAccountSectionTextField(
                          controller: phoneController,
                          hintText: "Phone",
                          onSaved: (value) {
                            _formData['phone'] = value;},
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }
        ),
      ),
    );
  }
}

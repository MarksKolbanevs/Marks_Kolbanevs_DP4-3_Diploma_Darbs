import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:monle/utils/globals.dart';
import 'package:monle/utils/widgets/gesture-detectors/login-signup-gesture-detector-text.dart';
import '../../utils/widgets/buttons/primary-rounded-proceed-button.dart';
import '../../utils/widgets/text-fields/auth-text-field.dart';
import 'login-page.dart';
import '../../styles/colors.dart';
import 'package:monle/styles/paints/wave.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({Key? key}) : super(key: key);

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> with SingleTickerProviderStateMixin {
  var errorMessage;

  late final AnimationController _controller = AnimationController(
    duration: Duration(seconds: 12),
    vsync: this,
  )..repeat();



  @override
  bool proceed = false;

  @override
  TextEditingController emailController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController repeatPasswordController = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    emailController.dispose();
    nameController.dispose();
    passwordController.dispose();
    repeatPasswordController.dispose();
    super.dispose();
    print('dispose worked');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body:SafeArea(
          child:Stack(
            children: [
              Positioned.fill(
                top:-100,
                child: CustomPaint(
                  painter: WavePainter(_controller),
                  size: Size(double.infinity, double.infinity),
                ),
              ),
              Positioned.fill(
                top:100,
                child: CustomPaint(
                  painter: WavePainter(_controller),
                  size: Size(double.infinity, double.infinity),
                ),
              ),
              Positioned.fill(
                top:300,
                child: CustomPaint(
                  painter: WavePainter(_controller),
                  size: Size(double.infinity, double.infinity),
                ),
              ),
              Center(
                child:SingleChildScrollView(
                  child:ClipRect(
                      child:BackdropFilter(
                        filter:ImageFilter.blur(sigmaX: 4.0, sigmaY: 4.0),
                        child: Container(
                          padding: const EdgeInsets.only(
                              top:40,
                              bottom: 40,
                              left:30,
                              right:30
                          ),
                          margin: const EdgeInsets.all(25.0),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(35),
                          ),
                          child:Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: <Widget>[
                              Text(AppLocalizations.of(context)!.signupTitle,style:Theme.of(context).textTheme.displayLarge),
                              SizedBox(height: 35),
                              AuthTextField(hintText: AppLocalizations.of(context)!.email, controller: emailController, icon: Icons.email_outlined),
                              SizedBox(height: 15),
                              AuthTextField(hintText: AppLocalizations.of(context)!.name, controller: nameController, icon: Icons.account_box_outlined),
                              SizedBox(height: 15),
                              AuthTextField(hintText: AppLocalizations.of(context)!.password, controller: passwordController, icon: Icons.lock_outline),
                              SizedBox(height: 15),
                              AuthTextField(hintText: AppLocalizations.of(context)!.repeatPassword, controller: repeatPasswordController, icon: Icons.repeat_rounded),
                              SizedBox(height: 35),
                              RedirectText(route: '/log-in', text: AppLocalizations.of(context)!.login ,title:  AppLocalizations.of(context)!.loginHint),
                              errorMessage != null ?
                              Padding(
                                padding: const EdgeInsets.only(
                                  top:15,
                                ),
                                child:Text('$errorMessage',
                                  style: TextStyle(fontSize:12.0,fontWeight: FontWeight.bold, color: Color(redColor)),
                                ),
                              ):SizedBox(),
                              SizedBox(height: 75),
                              Center(
                                  child: PrimaryRoundedProceedButton(onPressed:() => authRequests.signup(context, emailController.text,nameController.text, passwordController.text))
                              ),
                            ],
                          ),
                        ),
                      )
                  ),
                ),
              ),
            ],
          ),
        ),
    );
  }
}
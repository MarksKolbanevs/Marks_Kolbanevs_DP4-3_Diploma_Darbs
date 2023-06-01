import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:monle/utils/globals.dart';
import 'package:monle/utils/widgets/buttons/primary-rounded-proceed-button.dart';
import 'package:monle/utils/widgets/gesture-detectors/login-signup-gesture-detector-text.dart';
import 'package:monle/utils/widgets/social/social-button.dart';
import 'package:monle/utils/widgets/text-fields/auth-text-field.dart';
import '../../styles/colors.dart';
import 'package:monle/styles/paints/wave.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> with SingleTickerProviderStateMixin {
  String errorMessage = "";
  String jwtToken = "";

  late final AnimationController _controller = AnimationController(
    duration: Duration(seconds: 12),
    vsync: this,
  )..repeat();

  @override
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  var checkboxValue = false;

  @override
  void initState(){
    // TODO: implement initState
    authRequests.checkForJwtToken(context);
    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    _controller.dispose();
    emailController.dispose();
    passwordController.dispose();
    print('Dispose worked');
    super.dispose();
  }

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
                          child:Container(
                            padding: const EdgeInsets.only(
                                top:40,
                                bottom: 40,
                                left:30,
                                right:30
                            ),
                            margin: const EdgeInsets.all(25.0),
                            decoration: BoxDecoration(
                              //color: Colors.white.withOpacity(0.8),
                              borderRadius: BorderRadius.circular(16.0),
                            ),
                            child:Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: <Widget>[
                                Text(AppLocalizations.of(context)!.greeting,style: Theme.of(context).textTheme.displayLarge),
                                SizedBox(height: 30),
                                Row(
                                  children: [
                                    SocialButton(icon: Icons.phone,color:Colors.orange, onPressed: () {}),
                                    SizedBox(width: 20),
                                    SocialButton(icon: Icons.facebook,color:Color(0xfbb3B5998), onPressed: () {}),
                                  ],
                                ),
                                SizedBox(height: 30),
                                AuthTextField(hintText: AppLocalizations.of(context)!.email, controller: emailController, icon: Icons.email_outlined),
                                SizedBox(height: 15),
                                AuthTextField(hintText: AppLocalizations.of(context)!.password, controller: passwordController, icon: Icons.lock_outline),
                                SizedBox(height: 10),
                                CheckboxListTile(
                                  title: Text(AppLocalizations.of(context)!.rememberMe, style: Theme.of(context).textTheme.headlineSmall),
                                  value: checkboxValue,
                                  onChanged: (bool? value) {
                                    setState(() {
                                      checkboxValue = value ?? false;
                                    });
                                  },
                                  controlAffinity: ListTileControlAffinity.leading,
                                  contentPadding: EdgeInsets.zero,
                                  dense: true,
                                ),
                                SizedBox(height: 35),
                                RedirectText(route: '/sign-up', text: AppLocalizations.of(context)!.signup, title:AppLocalizations.of(context)!.loginHint),
                                errorMessage.isNotEmpty ?
                                Padding(
                                  padding: const EdgeInsets.only(
                                    top:15,
                                  ),
                                  child:Text('$errorMessage',
                                    style: TextStyle(fontSize:12.0,fontWeight: FontWeight.bold, color: Color(redColor)),
                                  ),
                                ):SizedBox(),
                                SizedBox(height: 70),
                                Center(
                                    child: PrimaryRoundedProceedButton(onPressed:() => authRequests.login(context, emailController.text, passwordController.text,checkboxValue))
                                ),
                              ],
                            ),
                          ),
                        )
                    )
                ),
              )
            ],
          ),
      ),
    );
  }
}

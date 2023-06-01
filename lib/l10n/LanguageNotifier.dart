import 'package:flutter/cupertino.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'dart:async';
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:monle/utils/globals.dart';
import 'package:flutter_blue/flutter_blue.dart';

class LanguageNotifier with ChangeNotifier{
  var _locale = const Locale('en');
  Locale get locale => _locale;

  void setLocale(Locale setLocale){
    _locale = setLocale;
    notifyListeners();
  }

}

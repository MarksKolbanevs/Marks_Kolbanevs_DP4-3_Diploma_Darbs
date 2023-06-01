import 'package:flutter/material.dart';
import 'package:monle/l10n/LanguageNotifier.dart';
import 'package:monle/navigation.dart';
import 'package:monle/pages/bag-scanning-page.dart';
import 'package:monle/pages/bottom-navigation/history-page.dart';
import 'package:monle/pages/bottom-navigation/home-page.dart';
import 'package:monle/pages/bottom-navigation/items-page.dart';
import 'package:monle/pages/bottom-navigation/settings/FAQ-page.dart';
import 'package:monle/pages/bottom-navigation/settings/account-page.dart';
import 'package:monle/pages/bottom-navigation/settings/bug-report-page.dart';
import 'package:monle/pages/bottom-navigation/settings/help/help-page.dart';
import 'package:monle/pages/bottom-navigation/settings/notification-page.dart';
import 'package:monle/pages/bottom-navigation/settings/password-change-page.dart';
import 'package:monle/pages/bottom-navigation/settings/settings-page.dart';
import 'package:monle/pages/new-bag-page.dart';
import 'package:monle/pages/new-item-page.dart';
import 'package:monle/pages/auth/signup-page.dart';
import 'package:provider/provider.dart';
import 'ble/ble-connection-notifier.dart';
import 'l10n/l10n.dart';
import 'pages/auth/login-page.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => BleConnectionNotifier()),
        ChangeNotifierProvider(create:(context) => LanguageNotifier()),
      ],
      child:MaterialApp(
          routes: {
            '/sign-up': (context) => const SignupPage(),
            '/log-in': (context) => const LoginPage(),
            '/new-bag': (context) => const NewBagPage(),
            '/bag-scanning': (context) => const BagScanningPage(),
            '/new-item': (context) => const NewItemPage(),
            '/navigation': (context) => const Navigation(),
            '/home': (context) => const HomePage(),
            '/items': (context) => const ItemsPage(),
            '/history': (context) => const HistoryPage(),
            '/settings':(context) => const SettingsPage(),
            '/settings/account':(context) => const AccountPage(),
            '/settings/notifications':(context) => const NotificationPage(),
            '/settings/bug-report':(context) => const BugReportPage(),
            '/settings/faq': (context) => FAQPage(),
            '/settings/help':(context) => const HelpPage(),
            '/settings/change-password':(context) => PasswordChangePage(),
          },
          theme: ThemeData(
            fontFamily: 'Inter',
            colorScheme: ColorScheme.fromSwatch().copyWith(
                primary: Colors.black,
                secondary: const Color(0xffbFFA800),
                tertiary: const Color(0xffbF9F9F9),
                onTertiary:  const Color(0xffF1F4FB),
            ),
            textTheme: const TextTheme(
              displayLarge: TextStyle(fontSize: 24,fontWeight: FontWeight.w500,color: Color(0xffb3E3E3E)),
              displayMedium: TextStyle(fontSize: 20,fontWeight: FontWeight.w600,color: Color(0xffb202020)),
              displaySmall: TextStyle(fontSize: 16,fontWeight: FontWeight.w500,color: Color(0xffb626262)),
              headlineMedium: TextStyle(fontSize: 14,fontWeight: FontWeight.w500,color: Color(0xffb949494)),
              headlineSmall: TextStyle(fontSize: 12,fontWeight: FontWeight.w600,color: Color(0xffb6D6D6D)),
            ),
          ),
          // darkTheme: ThemeData(
          //   scaffoldBackgroundColor: const Color(0xffb282828),
          //
          //   colorScheme: ColorScheme.fromSwatch().copyWith(
          //     primary: Colors.white,
          //   secondary: const Color(0xffb0A98FF),
          //     tertiary: const Color(0xff323232),
          //     onTertiary:  const Color(0xff323232),
          //   ),
          //   fontFamily: 'Inter',
          //   textTheme: const TextTheme(
          //     displayLarge: TextStyle(fontSize: 24,fontWeight: FontWeight.w500,color: Colors.white),
          //     displayMedium: TextStyle(fontSize: 20,fontWeight: FontWeight.w600,color: Color(0xffbDADADA)),
          //     displaySmall: TextStyle(fontSize: 16,fontWeight: FontWeight.w500,color: Color(0xffbBBBBBB)),
          //     headlineMedium: TextStyle(fontSize: 14,fontWeight: FontWeight.w500,color: Color(0xffb949494)),
          //     headlineSmall: TextStyle(fontSize: 12,fontWeight: FontWeight.w600,color: Color(0xffbBBBBBB)),
          //   ),
          // ),
          supportedLocales: L10n.all,
          localizationsDelegates: const [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
          ],
          locale:const Locale('lv'),
          home: const LoginPage()
      ),
    ),
  );
}

import 'package:monle/ble/ble-connection-notifier.dart';
import 'package:monle/requests/auth-requests.dart';
import 'package:monle/requests/bag-requests.dart';
import 'package:monle/requests/bug-requests.dart';
import 'package:monle/requests/help-requests.dart';
import 'package:monle/requests/history-requests.dart';
import 'package:monle/requests/settings-requests.dart';
import 'package:monle/requests/tag-requests.dart';
import 'package:monle/requests/user-requests.dart';
import 'package:monle/resources/socket.client.dart';
import 'package:shared_preferences/shared_preferences.dart';

final socketClient = SocketClient.instance.socket!;
final BagRequests bagRequests = BagRequests();
final SettingsRequests settingsRequests = SettingsRequests();
final TagRequests tagRequests = TagRequests();
final UserRequests userRequests = UserRequests();
final AuthRequests authRequests = AuthRequests();
final HistoryRequests historyRequests = HistoryRequests();
final BugRequests bugRequests = BugRequests();
final HelpRequests helpRequests = HelpRequests();
final BleConnectionNotifier bleConnectionNotifier = BleConnectionNotifier();




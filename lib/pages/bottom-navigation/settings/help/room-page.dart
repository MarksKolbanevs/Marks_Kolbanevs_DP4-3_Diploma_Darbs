import 'package:flutter/material.dart';
import 'package:monle/styles/colors.dart';
import 'package:monle/utils/widgets/aligns/room-page-helper-message-align.dart';
import 'package:monle/utils/widgets/aligns/room-page-user-message-align.dart';
import 'package:monle/utils/widgets/text-fields/auth-text-field.dart';

class RoomPage extends StatefulWidget {
  const RoomPage({Key? key}) : super(key: key);

  @override
  _RoomPageState createState() => _RoomPageState();
}

  @override
  TextEditingController messageController = TextEditingController();

class _RoomPageState extends State<RoomPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Container(
            padding: EdgeInsets.only(
              top: MediaQuery.of(context).padding.top + 16,
              left: 16,
              right: 16,
              bottom: 16,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
                Text('Room Page', style: Theme.of(context).textTheme.displaySmall),
                IconButton(icon: const Icon(Icons.more_vert),
                  onPressed: () {
                    // Handle more button press
                  },
                ),
              ],
            ),
          ),
          Expanded(
              child: SingleChildScrollView(
                reverse: true,
                child:Column(
                  children: [
                    RoomPageUserMessageAlign(message: 'Здарова'),
                    RoomPageHelperMessageAlign(message: 'Ку'),
                  ],
                ),
              ),
          ),
          Container(
            padding: EdgeInsets.only(
              top: MediaQuery.of(context).padding.top + 16,
              left: 16,
              right: 16,
              bottom: 16,
            ),
            child: AuthTextField(hintText: 'Enter message..', controller: messageController, icon: Icons.co2_outlined)
          ),
        ],
      ),
    );
  }
}

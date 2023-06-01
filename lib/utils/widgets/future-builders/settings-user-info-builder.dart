import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:monle/utils/globals.dart';

import '../../../pages/bottom-navigation/settings/account-page.dart';
import '../containers/shadow-container.dart';

class SettingsUserInfoBuilder extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return ShadowedContainer(
      padding: const EdgeInsets.only(left: 20, right: 20, top: 8, bottom: 8),
      child:FutureBuilder<Map<String, dynamic>>(
        future:userRequests.getUser(),
        builder: (context,AsyncSnapshot<Map<String, dynamic>> snapshot){
            if(!snapshot.hasData){
              return Text('no data');
            }
            final data = snapshot.data!;
            return TextButton(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => const AccountPage()),
                );},
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      ClipOval(
                        child: FutureBuilder<Uint8List>(
                          future: userRequests.getPhoto(),
                          builder: (context, snapshot) {
                            if (snapshot.hasData) {
                              return Image.memory(
                                snapshot.data!,
                                width: 50,
                                height: 50,
                              );
                            } else {
                              return CircularProgressIndicator();
                            }
                          },
                        ),
                      ),
                      const SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            data["name"],
                            style:Theme.of(context).textTheme.headlineMedium,
                          ),
                          const SizedBox(height: 5),
                          Text(
                            data["email"],
                            style:Theme.of(context).textTheme.headlineSmall,
                          ),
                        ],
                      ),
                    ],
                  ),
                  const Icon(Icons.settings_outlined, size: 28),
                ],
              ),
              );
        },
      ),

    );
  }
}

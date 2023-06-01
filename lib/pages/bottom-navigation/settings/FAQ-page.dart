import 'package:flutter/material.dart';
import 'package:monle/utils/widgets/app-bars/settings-section-app-bar.dart';
import 'package:monle/utils/widgets/expansion-tiles/settings-section-faq-expansion-tile.dart';

class FAQPage extends StatefulWidget {
  @override
  _FAQPage createState() => _FAQPage();
}

class _FAQPage extends State<FAQPage> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: SettingsSectionAppBar(sectionName: 'FAQ'),
      body: SafeArea(
        child:Column(
          children: [
            SizedBox(height: 20),
            SettingsSectionFAQExpansionTile(
                title: 'What is Perkz dollar?',
                text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English.'
            ),
            SettingsSectionFAQExpansionTile(
                title: 'What is Perkz dollar?',
                text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English.'
            ),
            SettingsSectionFAQExpansionTile(
                title: 'What is Perkz dollar?',
                text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English.'
            ),
          ],
        ),
      ),
    );
  }
}

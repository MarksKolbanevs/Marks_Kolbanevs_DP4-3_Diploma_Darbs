import 'package:flutter/material.dart';

class SettingsSectionAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String sectionName;

  SettingsSectionAppBar({required this.sectionName});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.transparent,
      elevation: 0.0,
      title: Text(sectionName, style:Theme.of(context).textTheme.displayLarge),
      centerTitle: true,
      leading: IconButton(
        icon: Icon(
            Icons.arrow_back_ios_new_rounded,
            color:Theme.of(context).colorScheme.primary,
        ),
        onPressed: () => Navigator.pop(context),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

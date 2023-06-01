import 'package:flutter/material.dart';

class SettingsSectionFAQExpansionTile extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final String text;

  SettingsSectionFAQExpansionTile({required this.title, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: Theme.of(context).colorScheme.secondary.withOpacity(0.25))),
      ),
      child:ExpansionTile(
        backgroundColor: Theme.of(context).colorScheme.secondary.withOpacity(0.15),
        tilePadding: const EdgeInsets.only(
            left: 25,
            right: 20
        ),
        childrenPadding: const EdgeInsets.only(
            left: 25,
            right: 40,
            bottom: 35
        ),
        trailing: Icon(Icons.keyboard_arrow_down_rounded, color: Theme.of(context).colorScheme.primary.withOpacity(0.15)),
        title: Text(
          title,
          style:Theme.of(context).textTheme.displaySmall?.copyWith(
            fontWeight: FontWeight.w400, // add bold font weight
            color:Theme.of(context).colorScheme.secondary, // change text color to red
            letterSpacing: 0.5, // increase letter spacing
          ),
        ),
        initiallyExpanded: false,
        children: [
          Text(text, style:Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w400,color: Theme.of(context).colorScheme.primary.withOpacity(0.70))),
        ],
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

import 'dart:math';

import 'package:flutter/material.dart';
import 'package:fluster_native_interface/fluster_native_interface.dart'
    as native;

class PermissionToSetupStep extends StatelessWidget {
  const PermissionToSetupStep({super.key});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.sizeOf(context);
    return Center(
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: min(size.width - 64, 450)),
        child: Card(
          // surfaceTintColor: theme.primaryColor,
          shadowColor: theme.primaryColor,
          borderOnForeground: true,
          elevation: 900,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(8)),
            side: BorderSide(color: theme.dividerColor, width: 2),
          ),
          child: Padding(
            padding: const EdgeInsets.all(32.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              spacing: 16,
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Text("Just a second...", style: theme.textTheme.headlineMedium),
                const Text(
                  "Fluster embeds a SurrealDB server in your application that then persists data on your file system. ",
                ),
                const Text(
                  "When you click continue, we'll create a directory in your operating system's traditional data directory.",
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    FilledButton(
                      onPressed: () {
                        native.setupFileSystemForData();
                      },
                      child: Text("Continue"),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

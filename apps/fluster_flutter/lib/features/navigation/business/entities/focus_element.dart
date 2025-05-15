import 'package:flutter/material.dart';

abstract class FlusterFocusable extends StatelessWidget {
  const FlusterFocusable({super.key});
  focusNodeRight();
  focusNodeLeft();
  focusNodeUp();
  focusNodeDown();
}

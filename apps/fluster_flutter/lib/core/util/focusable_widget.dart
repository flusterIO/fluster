import 'package:flutter/material.dart';


class FocusIndices {
    final int vertical;
    final int horizontal;
    const FocusIndices({required this.vertical, required this.horizontal});
}


abstract class FocusableFlusterWidget extends StatelessWidget {
    final FocusIndices focusIndices;
    const FocusableFlusterWidget({super.key, required this.focusIndices});
}

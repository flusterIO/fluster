// import 'package:fluster_native_interface/fluster_native_interface.dart';
import 'package:file_picker/file_picker.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:fluster/static/styles/shad/shad_themes.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:logging/logging.dart';

// Takes the new value as a paramater, and returns the error to display one exists.
typedef ValidatorFunc = String? Function(String);
typedef OnAcceptFunc = void Function(String);

enum PathPickerType { singleFile, multiFile, singleDirectory }

class PathPickerInput extends StatefulWidget {
  final ValidatorFunc? validator;
  final OnAcceptFunc? onAccept;
  final PathPickerType type = PathPickerType.singleFile;
    final GlobalKey<FormState> formKey;

  const PathPickerInput({
    super.key,
    this.validator,
    this.onAccept,
        required this.formKey,
    PathPickerType type = PathPickerType.singleFile,
  });
  @override
  _PathPickerInputState createState() => _PathPickerInputState(
    onAccept: onAccept,
    validator: validator,
    type: type,
    formKey: formKey,
  );
}

class _PathPickerInputState extends State<PathPickerInput> {
  final _defaultFileNameController = TextEditingController();
  final _dialogTitleController = TextEditingController();
  final _initialDirectoryController = TextEditingController();
  final _fileExtensionController = TextEditingController();
  final _textEditController = TextEditingController();
  // final _scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
  final PathPickerType type = PathPickerType.singleFile;
  final ValidatorFunc? validator;
  final OnAcceptFunc? onAccept;
  final GlobalKey<FormState> formKey;
  String? _fileName;
  String? _saveAsFileName;
  List<PlatformFile>? _paths;
  String? _directoryPath;
  String? _extension;
  bool _isLoading = false;
  final bool _lockParentWindow = false;
  bool _userAborted = false;
  final bool _multiPick = false;
  final FileType _pickingType = FileType.any;

  _PathPickerInputState({
    this.validator,
    this.onAccept,
    required this.formKey,
    PathPickerType type = PathPickerType.singleFile,
  });

  @override
  void initState() {
    super.initState();
    _fileExtensionController.addListener(
      () => _extension = _fileExtensionController.text,
    );
  }

  void _pickFiles(bool multiple) async {
    // _resetState();
    try {
      _directoryPath = null;
      final res = await FilePicker.platform.pickFiles( 
            compressionQuality: 30,
            type: _pickingType,
            allowMultiple: multiple,
            onFileLoading: (FilePickerStatus status) => print(status),
            allowedExtensions:
                (_extension?.isNotEmpty ?? false)
                    ? _extension?.replaceAll(' ', '').split(',')
                    : null,
            dialogTitle: _dialogTitleController.text,
            initialDirectory: _initialDirectoryController.text,
            lockParentWindow: _lockParentWindow,
            );
            print(res?.files);
      // _paths =
      //     (await FilePicker.platform.pickFiles(
      //     ))?.files;
    } on PlatformException catch (e) {
      Logger.detached('Unsupported operation$e');
    } catch (e) {
      Logger.detached(e.toString());
    }
    // if (!mounted) return;
    setState(() {
      _isLoading = false;
      _fileName =
          _paths != null ? _paths!.map((e) => e.name).toString() : '...';
      _userAborted = _paths == null;
    });
  }

  // void _clearCachedFiles() async {
  //   _resetState();
  //   try {
  //     bool? result = await FilePicker.platform.clearTemporaryFiles();
  //     _scaffoldMessengerKey.currentState?.hideCurrentSnackBar();
  //     _scaffoldMessengerKey.currentState?.showSnackBar(
  //       SnackBar(
  //         content: Text(
  //           (result!
  //               ? 'Temporary files removed with success.'
  //               : 'Failed to clean temporary files'),
  //           style: const TextStyle(color: Colors.white),
  //         ),
  //       ),
  //     );
  //   } on PlatformException catch (e) {
  //     _logException('Unsupported operation$e');
  //   } catch (e) {
  //     _logException(e.toString());
  //   } finally {
  //     setState(() => _isLoading = false);
  //   }
  // }

  void _pickFolder() async {
    _resetState();
    try {
      String? path = await FilePicker.platform.getDirectoryPath(
        dialogTitle: _dialogTitleController.text,
        initialDirectory: _initialDirectoryController.text,
        lockParentWindow: _lockParentWindow,
      );
      setState(() {
        _directoryPath = path;
        _userAborted = path == null;
      });
    } on PlatformException catch (e) {
      Logger.detached('Unsupported operation$e');
    } catch (e) {
      Logger.detached(e.toString());
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _pick() async {
    switch (type) {
      case PathPickerType.singleFile:
        return _pickFiles(false);
      case PathPickerType.multiFile:
        return _pickFiles(true);
      case PathPickerType.singleDirectory:
        return _pickFolder();
    }
  }

  // Future<void> _saveFile() async {
  //   try {
  //     String? fileName = await FilePicker.platform.saveFile(
  //       allowedExtensions:
  //           (_extension?.isNotEmpty ?? false)
  //               ? _extension?.replaceAll(' ', '').split(',')
  //               : null,
  //       type: _pickingType,
  //       dialogTitle: _dialogTitleController.text,
  //       fileName: _defaultFileNameController.text,
  //       initialDirectory: _initialDirectoryController.text,
  //       lockParentWindow: _lockParentWindow,
  //     );
  //     setState(() {
  //       _saveAsFileName = fileName;
  //       _userAborted = fileName == null;
  //     });
  //   } on PlatformException catch (e) {
  //     _logException('Unsupported operation$e');
  //   } catch (e) {
  //     _logException(e.toString());
  //   } finally {
  //     _resetState();
  //     setState(() => _isLoading = false);
  //   }
  // }

  void validateAndReturn() {
    final FormState form = formKey.currentState!;
    if (form.validate()) {
      // if (onAccept != null) {
        // Add callback here
        // onAccept(form.context)
      // }
    }
  }

  void _resetState() {
    if (!mounted) {
      return;
    }
    setState(() {
      _isLoading = true;
      _directoryPath = null;
      _fileName = null;
      _paths = null;
      _saveAsFileName = null;
      _userAborted = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final shad = theme.extension<ShadTheme>()!;
    return TextFormField(
      maxLines: 1,
      controller: _textEditController,
      cursorColor: shad.primary,
      onFieldSubmitted: (String? val) {
        validateAndReturn();
      },
      onEditingComplete: () {
        validateAndReturn();
      },
      validator: (fp) {
        if (fp == null || fp == "") {
          return null;
        }
        if (validator != null) {
          final userValidated = validator!(fp);
          if (userValidated != null && userValidated != "") {
            return userValidated;
          }
        }
        // FIX: Add this back in! Get this fucking rust bridge working...
        // final exists = pathExists(name: fp);
        // if (!exists) {
        //   return "Path does not exist";
        // }

        return null;
      },
      decoration: InputDecoration(
        label: Text("Path to bibtex file"),
        isDense: true,
        focusedBorder: UnderlineInputBorder(
          borderSide: BorderSide(color: shad.primary),
        ),
        floatingLabelStyle: TextStyle(color: shad.primary), // disabledBorder:
        suffixIcon: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: _pick,
            child: Icon(FluentIcons.search_sparkle_16_filled),
          ),
        ),
        // prefixIcon: Icon(Icons.close)
      ),
    );
  }
}

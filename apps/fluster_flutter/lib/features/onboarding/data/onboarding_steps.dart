import 'package:fluster/features/navigation/business/entities/router/routes.dart';
import 'package:fluster/features/onboarding/data/models/onboarding_step.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

final onboardingSteps = <OnboardingStep>[
  OnboardingStep(
    label: "Can we set up a few things?",
    desc: "We just have to set up a few things initially.",
    idx: 0,
    icon: FontAwesomeIcons.buildingLock,
    href: SetupOnboardingStepRoute().location,
  ),
  OnboardingStep(
    label: "Where do you keep your notes?",
    desc:
        "Learn why Fluster was created, what makes Fluster special, and where Fluster plans to go in the future.",
    idx: 1,
    icon: FontAwesomeIcons.locationDot,
    href: LocationOfNotesOnboardingRoute().location,
  ),
  OnboardingStep(
    label: "Familiarize yourself with Fluster",
    desc:
        "Learn why Fluster was created, what makes Fluster special, and where Fluster plans to go in the future.",
    idx: 2,
    icon: FontAwesomeIcons.glasses,
    href: TourOfFlusterOnboardingRoute().location,
  ),
  OnboardingStep(
    label: "Origins of Fluster",
    desc:
        "Learn why Fluster was created, what makes Fluster special, and where Fluster plans to go in the future.",
    idx: 3,
    icon: FontAwesomeIcons.school,
    href: OriginsOfFlusterOnboardingRoute().location,
  ),
];

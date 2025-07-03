class ConstantValue {
    label: string;
    value: number;
    unit: string;
    constructor(label: string, value: number, unit: string) {
        this.label = label;
        this.value = value;
        this.unit = unit;
    }
}

export class Constants {
    kilogram_hertz_relationship = new ConstantValue(
        "kilogram-hertz relationship",
        1.356392489e50,
        "Hz"
    );
    kilogram_inverse_meter_relationship = new ConstantValue(
        "kilogram-inverse meter relationship",
        4.524438335e41,
        "m^-1"
    );
    kilogram_kelvin_relationship = new ConstantValue(
        "kilogram-kelvin relationship",
        6.50965726e39,
        "K"
    );
    kilogram_electron_volt_relationship = new ConstantValue(
        "kilogram-electron volt relationship",
        5.609588603e35,
        "eV"
    );
    kilogram_hartree_relationship = new ConstantValue(
        "kilogram-hartree relationship",
        2.0614857887409e34,
        "E_h"
    );
    joule_hertz_relationship = new ConstantValue(
        "joule-hertz relationship",
        1.509190179e33,
        "Hz"
    );
    Planck_temperature = new ConstantValue(
        "Planck temperature",
        1.416784e32,
        "K"
    );
    kilogram_atomic_mass_unit_relationship = new ConstantValue(
        "kilogram-atomic mass unit relationship",
        6.0221407621e26,
        "u"
    );
    Loschmidt_constant_27315_K_101325_kPa = new ConstantValue(
        "Loschmidt constant (273.15 K, 101.325 kPa)",
        2.686780111e25,
        "m^-3"
    );
    Loschmidt_constant_27315_K_100_kPa = new ConstantValue(
        "Loschmidt constant (273.15 K, 100 kPa)",
        2.651645804e25,
        "m^-3"
    );
    joule_inverse_meter_relationship = new ConstantValue(
        "joule-inverse meter relationship",
        5.034116567e24,
        "m^-1"
    );
    Avogadro_constant = new ConstantValue(
        "Avogadro constant",
        6.02214076e23,
        "mol^-1"
    );
    atomic_mass_unit_hertz_relationship = new ConstantValue(
        "atomic mass unit-hertz relationship",
        2.25234271871e23,
        "Hz"
    );
    joule_kelvin_relationship = new ConstantValue(
        "joule-kelvin relationship",
        7.242970516e22,
        "K"
    );
    atomic_unit_of_electric_field_gradient = new ConstantValue(
        "atomic unit of electric field gradient",
        9.7173624292e21,
        "V m^-2"
    );
    Planck_mass_energy_equivalent_in_GeV = new ConstantValue(
        "Planck mass energy equivalent in GeV",
        1.22089e19,
        "GeV"
    );
    joule_electron_volt_relationship = new ConstantValue(
        "joule-electron volt relationship",
        6.241509074e18,
        "eV"
    );
    joule_hartree_relationship = new ConstantValue(
        "joule-hartree relationship",
        2.2937122783963e17,
        "E_h"
    );
    kilogram_joule_relationship = new ConstantValue(
        "kilogram-joule relationship",
        8.987551787368176e16,
        "J"
    );
    hartree_hertz_relationship = new ConstantValue(
        "hartree-hertz relationship",
        6579683920502000.0,
        "Hz"
    );
    Rydberg_constant_times_c_in_Hz = new ConstantValue(
        "Rydberg constant times c in Hz",
        3289841960250800.0,
        "Hz"
    );
    elementary_charge_over_h_bar = new ConstantValue(
        "elementary charge over h-bar",
        1519267447000000.0,
        "A J^-1"
    );
    atomic_mass_unit_inverse_meter_relationship = new ConstantValue(
        "atomic mass unit-inverse meter relationship",
        751300661040000.0,
        "m^-1"
    );
    conventional_value_of_Josephson_constant = new ConstantValue(
        "conventional value of Josephson constant",
        483597900000000.0,
        "Hz V^-1"
    );
    Josephson_constant = new ConstantValue(
        "Josephson constant",
        483597848400000.0,
        "Hz V^-1"
    );
    elementary_charge_over_h = new ConstantValue(
        "elementary charge over h",
        241798926200000.0,
        "A J^-1"
    );
    electron_volt_hertz_relationship = new ConstantValue(
        "electron volt-hertz relationship",
        241798924200000.0,
        "Hz"
    );
    atomic_mass_unit_kelvin_relationship = new ConstantValue(
        "atomic mass unit-kelvin relationship",
        10809540191600.0,
        "K"
    );
    atomic_unit_of_charge_density = new ConstantValue(
        "atomic unit of charge density",
        1081202384570.0,
        "C m^-3"
    );
    atomic_unit_of_electric_field = new ConstantValue(
        "atomic unit of electric field",
        514220674763.0,
        "V m^-1"
    );
    electron_gyromagn_ratio = new ConstantValue(
        "electron gyromagn. ratio",
        176085963023.0,
        "s^-1 T^-1"
    );
    electron_gyromag_ratio = new ConstantValue(
        "electron gyromag. ratio",
        176085963023.0,
        "s^-1 T^-1"
    );
    Wien_frequency_displacement_law_constant = new ConstantValue(
        "Wien frequency displacement law constant",
        58789257570.0,
        "Hz K^-1"
    );
    Boltzmann_constant_in_HzK = new ConstantValue(
        "Boltzmann constant in Hz/K",
        20836619120.0,
        "Hz K^-1"
    );
    kelvin_hertz_relationship = new ConstantValue(
        "kelvin-hertz relationship",
        20836619120.0,
        "Hz"
    );
    Bohr_magneton_in_HzT = new ConstantValue(
        "Bohr magneton in Hz/T",
        13996244936.1,
        "Hz T^-1"
    );
    hyperfine_transition_frequency_of_Cs_133 = new ConstantValue(
        "hyperfine transition frequency of Cs-133",
        9192631770.0,
        "Hz"
    );
    joule_atomic_mass_unit_relationship = new ConstantValue(
        "joule-atomic mass unit relationship",
        6700535256.5,
        "u"
    );
    atomic_mass_unit_electron_volt_relationship = new ConstantValue(
        "atomic mass unit-electron volt relationship",
        931494102.42,
        "eV"
    );
    inverse_meter_hertz_relationship = new ConstantValue(
        "inverse meter-hertz relationship",
        299792458.0,
        "Hz"
    );
    natural_unit_of_velocity = new ConstantValue(
        "natural unit of velocity",
        299792458.0,
        "m s^-1"
    );
    speed_of_light_in_vacuum = new ConstantValue(
        "speed of light in vacuum",
        299792458.0,
        "m s^-1"
    );
    proton_gyromagn_ratio = new ConstantValue(
        "proton gyromagn. ratio",
        267522187.44,
        "s^-1 T^-1"
    );
    proton_gyromag_ratio = new ConstantValue(
        "proton gyromag. ratio",
        267522187.44,
        "s^-1 T^-1"
    );
    shielded_proton_gyromag_ratio = new ConstantValue(
        "shielded proton gyromag. ratio",
        267515315.1,
        "s^-1 T^-1"
    );
    shielded_helion_gyromagn_ratio = new ConstantValue(
        "shielded helion gyromagn. ratio",
        203789456.9,
        "s^-1 T^-1"
    );
    shielded_helion_gyromag_ratio = new ConstantValue(
        "shielded helion gyromag. ratio",
        203789456.9,
        "s^-1 T^-1"
    );
    neutron_gyromagn_ratio = new ConstantValue(
        "neutron gyromagn. ratio",
        183247171.0,
        "s^-1 T^-1"
    );
    neutron_gyromag_ratio = new ConstantValue(
        "neutron gyromag. ratio",
        183247171.0,
        "s^-1 T^-1"
    );
    proton_charge_to_mass_quotient = new ConstantValue(
        "proton charge to mass quotient",
        95788331.56,
        "C kg^-1"
    );
    atomic_mass_unit_hartree_relationship = new ConstantValue(
        "atomic mass unit-hartree relationship",
        34231776.874,
        "E_h"
    );
    hartree_inverse_meter_relationship = new ConstantValue(
        "hartree-inverse meter relationship",
        21947463.13632,
        "m^-1"
    );
    Rydberg_constant = new ConstantValue(
        "Rydberg constant",
        10973731.56816,
        "m^-1"
    );
    atomic_unit_of_velocity = new ConstantValue(
        "atomic unit of velocity",
        2187691.26364,
        "m s^-1"
    );
    electron_volt_inverse_meter_relationship = new ConstantValue(
        "electron volt-inverse meter relationship",
        806554.3937,
        "m^-1"
    );
    hartree_kelvin_relationship = new ConstantValue(
        "hartree-kelvin relationship",
        315775.02480407,
        "K"
    );
    atomic_unit_of_magn_flux_density = new ConstantValue(
        "atomic unit of magn. flux density",
        235051.756758,
        "T"
    );
    atomic_unit_of_mag_flux_density = new ConstantValue(
        "atomic unit of mag. flux density",
        235051.756758,
        "T"
    );
    standard_atmosphere = new ConstantValue(
        "standard atmosphere",
        101325.0,
        "Pa"
    );
    standard_state_pressure = new ConstantValue(
        "standard-state pressure",
        100000.0,
        "Pa"
    );
    Faraday_constant = new ConstantValue(
        "Faraday constant",
        96485.33212,
        "C mol^-1"
    );
    Faraday_constant_for_conventional_electric_current = new ConstantValue(
        "Faraday constant for conventional electric current",
        96485.3251,
        "C_90 mol^-1"
    );
    electron_gyromagn_ratio_over_2_pi = new ConstantValue(
        "electron gyromagn. ratio over 2 pi",
        28024.9532,
        "MHz T^-1"
    );
    electron_gyromag_ratio_over_2_pi = new ConstantValue(
        "electron gyromag. ratio over 2 pi",
        28024.95164,
        "MHz T^-1"
    );
    electron_gyromag_ratio_in_MHzT = new ConstantValue(
        "electron gyromag. ratio in MHz/T",
        28024.9514242,
        "MHz T^-1"
    );
    von_Klitzing_constant = new ConstantValue(
        "von Klitzing constant",
        25812.80745,
        "ohm"
    );
    conventional_value_of_von_Klitzing_constant = new ConstantValue(
        "conventional value of von Klitzing constant",
        25812.807,
        "ohm"
    );
    inverse_of_conductance_quantum = new ConstantValue(
        "inverse of conductance quantum",
        12906.40372,
        "ohm"
    );
    electron_volt_kelvin_relationship = new ConstantValue(
        "electron volt-kelvin relationship",
        11604.51812,
        "K"
    );
    alpha_particle_electron_mass_ratio = new ConstantValue(
        "alpha particle-electron mass ratio",
        7294.29954142,
        ""
    );
    triton_electron_mass_ratio = new ConstantValue(
        "triton-electron mass ratio",
        5496.92153573,
        ""
    );
    helion_electron_mass_ratio = new ConstantValue(
        "helion-electron mass ratio",
        5495.88528007,
        ""
    );
    alpha_particle_mass_energy_equivalent_in_MeV = new ConstantValue(
        "alpha particle mass energy equivalent in MeV",
        3727.3794066,
        "MeV"
    );
    deuteron_electron_mass_ratio = new ConstantValue(
        "deuteron-electron mass ratio",
        3670.48296788,
        ""
    );
    tau_electron_mass_ratio = new ConstantValue(
        "tau-electron mass ratio",
        3477.23,
        ""
    );
    triton_mass_energy_equivalent_in_MeV = new ConstantValue(
        "triton mass energy equivalent in MeV",
        2808.92113298,
        "MeV"
    );
    helion_mass_energy_equivalent_in_MeV = new ConstantValue(
        "helion mass energy equivalent in MeV",
        2808.39160743,
        "MeV"
    );
    deuteron_mass_energy_equivalent_in_MeV = new ConstantValue(
        "deuteron mass energy equivalent in MeV",
        1875.61294257,
        "MeV"
    );
    neutron_electron_mass_ratio = new ConstantValue(
        "neutron-electron mass ratio",
        1838.68366173,
        ""
    );
    proton_electron_mass_ratio = new ConstantValue(
        "proton-electron mass ratio",
        1836.15267343,
        ""
    );
    tau_energy_equivalent = new ConstantValue(
        "tau energy equivalent",
        1776.86,
        "MeV"
    );
    tau_mass_energy_equivalent_in_MeV = new ConstantValue(
        "tau mass energy equivalent in MeV",
        1776.82,
        "MeV"
    );
    electron_neutron_magn_moment_ratio = new ConstantValue(
        "electron-neutron magn. moment ratio",
        960.9205,
        ""
    );
    electron_neutron_mag_mom_ratio = new ConstantValue(
        "electron-neutron mag. mom. ratio",
        960.9205,
        ""
    );
    neutron_mass_energy_equivalent_in_MeV = new ConstantValue(
        "neutron mass energy equivalent in MeV",
        939.56542052,
        "MeV"
    );
    proton_mass_energy_equivalent_in_MeV = new ConstantValue(
        "proton mass energy equivalent in MeV",
        938.27208816,
        "MeV"
    );
    atomic_mass_constant_energy_equivalent_in_MeV = new ConstantValue(
        "atomic mass constant energy equivalent in MeV",
        931.49410242,
        "MeV"
    );
    electron_to_shielded_helion_mag_mom_ratio = new ConstantValue(
        "electron to shielded helion mag. mom. ratio",
        864.058257,
        ""
    );
    electron_to_shielded_helion_magn_moment_ratio = new ConstantValue(
        "electron to shielded helion magn. moment ratio",
        864.058255,
        ""
    );
    luminous_efficacy = new ConstantValue("luminous efficacy", 683.0, "lm W^-1");
    characteristic_impedance_of_vacuum = new ConstantValue(
        "characteristic impedance of vacuum",
        376.73031366686166,
        "ohm"
    );
    muon_electron_mass_ratio = new ConstantValue(
        "muon-electron mass ratio",
        206.768283,
        ""
    );
    electron_muon_magn_moment_ratio = new ConstantValue(
        "electron-muon magn. moment ratio",
        206.7669894,
        ""
    );
    electron_muon_mag_mom_ratio = new ConstantValue(
        "electron-muon mag. mom. ratio",
        206.7669883,
        ""
    );
    reduced_Planck_constant_times_c_in_MeV_fm = new ConstantValue(
        "reduced Planck constant times c in MeV fm",
        197.3269804,
        "MeV fm"
    );
    Planck_constant_over_2_pi_times_c_in_MeV_fm = new ConstantValue(
        "Planck constant over 2 pi times c in MeV fm",
        197.3269788,
        "MeV fm"
    );
    inverse_fine_structure_constant = new ConstantValue(
        "inverse fine-structure constant",
        137.035999084,
        ""
    );
    muon_mass_energy_equivalent_in_MeV = new ConstantValue(
        "muon mass energy equivalent in MeV",
        105.6583755,
        "MeV"
    );
    kelvin_inverse_meter_relationship = new ConstantValue(
        "kelvin-inverse meter relationship",
        69.50348004,
        "m^-1"
    );
    Boltzmann_constant_in_inverse_meter_per_kelvin = new ConstantValue(
        "Boltzmann constant in inverse meter per kelvin",
        69.50348004,
        "m^-1 K^-1"
    );
    Boltzmann_constant_in_inverse_meters_per_kelvin = new ConstantValue(
        "Boltzmann constant in inverse meters per kelvin",
        69.503457,
        "m^-1 K^-1"
    );
    Bohr_magneton_in_inverse_meters_per_tesla = new ConstantValue(
        "Bohr magneton in inverse meters per tesla",
        46.68644814,
        "m^-1 T^-1"
    );
    Bohr_magneton_in_inverse_meter_per_tesla = new ConstantValue(
        "Bohr magneton in inverse meter per tesla",
        46.686447783,
        "m^-1 T^-1"
    );
    proton_gyromagn_ratio_over_2_pi = new ConstantValue(
        "proton gyromagn. ratio over 2 pi",
        42.5774813,
        "MHz T^-1"
    );
    proton_gyromag_ratio_over_2_pi = new ConstantValue(
        "proton gyromag. ratio over 2 pi",
        42.57747892,
        "MHz T^-1"
    );
    proton_gyromag_ratio_in_MHzT = new ConstantValue(
        "proton gyromag. ratio in MHz/T",
        42.577478518,
        "MHz T^-1"
    );
    shielded_proton_gyromag_ratio_over_2_pi = new ConstantValue(
        "shielded proton gyromag. ratio over 2 pi",
        42.57638507,
        "MHz T^-1"
    );
    shielded_proton_gyromag_ratio_in_MHzT = new ConstantValue(
        "shielded proton gyromag. ratio in MHz/T",
        42.57638474,
        "MHz T^-1"
    );
    shielded_helion_gyromagn_ratio_over_2_pi = new ConstantValue(
        "shielded helion gyromagn. ratio over 2 pi",
        32.4341015,
        "MHz T^-1"
    );
    shielded_helion_gyromag_ratio_over_2_pi = new ConstantValue(
        "shielded helion gyromag. ratio over 2 pi",
        32.43409966,
        "MHz T^-1"
    );
    shielded_helion_gyromag_ratio_in_MHzT = new ConstantValue(
        "shielded helion gyromag. ratio in MHz/T",
        32.43409942,
        "MHz T^-1"
    );
    neutron_gyromagn_ratio_over_2_pi = new ConstantValue(
        "neutron gyromagn. ratio over 2 pi",
        29.164695,
        "MHz T^-1"
    );
    neutron_gyromag_ratio_over_2_pi = new ConstantValue(
        "neutron gyromag. ratio over 2 pi",
        29.1646933,
        "MHz T^-1"
    );
    neutron_gyromag_ratio_in_MHzT = new ConstantValue(
        "neutron gyromag. ratio in MHz/T",
        29.1646931,
        "MHz T^-1"
    );
    atomic_unit_of_electric_potential = new ConstantValue(
        "atomic unit of electric potential",
        27.211386245988,
        "V"
    );
    hartree_electron_volt_relationship = new ConstantValue(
        "hartree-electron volt relationship",
        27.211386245988,
        "eV"
    );
    Hartree_energy_in_eV = new ConstantValue(
        "Hartree energy in eV",
        27.211386245988,
        "eV"
    );
    tau_muon_mass_ratio = new ConstantValue("tau-muon mass ratio", 16.817, "");
    Rydberg_constant_times_hc_in_eV = new ConstantValue(
        "Rydberg constant times hc in eV",
        13.605693122994,
        "eV"
    );
    standard_acceleration_of_gravity = new ConstantValue(
        "standard acceleration of gravity",
        9.80665,
        "m s^-2"
    );
    neutron_muon_mass_ratio = new ConstantValue(
        "neutron-muon mass ratio",
        8.89248406,
        ""
    );
    proton_muon_mass_ratio = new ConstantValue(
        "proton-muon mass ratio",
        8.88024337,
        ""
    );
    molar_gas_constant = new ConstantValue(
        "molar gas constant",
        8.314462618,
        "J mol^-1 K^-1"
    );
    nuclear_magneton_in_MHzT = new ConstantValue(
        "nuclear magneton in MHz/T",
        7.6225932291,
        "MHz T^-1"
    );
    triton_g_factor = new ConstantValue("triton g factor", 5.957924931, "");
    proton_g_factor = new ConstantValue("proton g factor", 5.5856946893, "");
    alpha_particle_mass_in_u = new ConstantValue(
        "alpha particle mass in u",
        4.001506179127,
        "u"
    );
    alpha_particle_relative_atomic_mass = new ConstantValue(
        "alpha particle relative atomic mass",
        4.001506179127,
        ""
    );
    alpha_particle_proton_mass_ratio = new ConstantValue(
        "alpha particle-proton mass ratio",
        3.97259969009,
        ""
    );
    triton_mass_in_u = new ConstantValue("triton mass in u", 3.01550071621, "u");
    triton_relative_atomic_mass = new ConstantValue(
        "triton relative atomic mass",
        3.01550071621,
        ""
    );
    helion_mass_in_u = new ConstantValue("helion mass in u", 3.014932247175, "u");
    helion_relative_atomic_mass = new ConstantValue(
        "helion relative atomic mass",
        3.014932247175,
        ""
    );
    triton_proton_mass_ratio = new ConstantValue(
        "triton-proton mass ratio",
        2.99371703414,
        ""
    );
    helion_proton_mass_ratio = new ConstantValue(
        "helion-proton mass ratio",
        2.99315267167,
        ""
    );
    triton_mag_mom_to_nuclear_magneton_ratio = new ConstantValue(
        "triton mag. mom. to nuclear magneton ratio",
        2.9789624656,
        ""
    );
    proton_magn_moment_to_nuclear_magneton_ratio = new ConstantValue(
        "proton magn. moment to nuclear magneton ratio",
        2.792847351,
        ""
    );
    proton_mag_mom_to_nuclear_magneton_ratio = new ConstantValue(
        "proton mag. mom. to nuclear magneton ratio",
        2.79284734463,
        ""
    );
    shielded_proton_magn_moment_to_nuclear_magneton_ratio = new ConstantValue(
        "shielded proton magn. moment to nuclear magneton ratio",
        2.792775604,
        ""
    );
    shielded_proton_mag_mom_to_nuclear_magneton_ratio = new ConstantValue(
        "shielded proton mag. mom. to nuclear magneton ratio",
        2.792775599,
        ""
    );
    deuteron_mass_in_u = new ConstantValue(
        "deuteron mass in u",
        2.013553212745,
        "u"
    );
    deuteron_relative_atomic_mass = new ConstantValue(
        "deuteron relative atomic mass",
        2.013553212745,
        ""
    );
    deuteron_proton_mass_ratio = new ConstantValue(
        "deuteron-proton mass ratio",
        1.99900750139,
        ""
    );
    tau_mass_in_u = new ConstantValue("tau mass in u", 1.90754, "u");
    tau_proton_mass_ratio = new ConstantValue(
        "tau-proton mass ratio",
        1.89376,
        ""
    );
    tau_neutron_mass_ratio = new ConstantValue(
        "tau-neutron mass ratio",
        1.89115,
        ""
    );
    neutron_proton_mass_difference_energy_equivalent_in_MeV = new ConstantValue(
        "neutron-proton mass difference energy equivalent in MeV",
        1.29333236,
        "MeV"
    );
    triton_to_proton_mag_mom_ratio = new ConstantValue(
        "triton to proton mag. mom. ratio",
        1.0666399191,
        ""
    );
    triton_proton_mag_mom_ratio = new ConstantValue(
        "triton-proton mag. mom. ratio",
        1.066639908,
        ""
    );
    neutron_mass_in_u = new ConstantValue(
        "neutron mass in u",
        1.00866491595,
        "u"
    );
    neutron_relative_atomic_mass = new ConstantValue(
        "neutron relative atomic mass",
        1.00866491595,
        ""
    );
    proton_mass_in_u = new ConstantValue("proton mass in u", 1.007276466621, "u");
    proton_relative_atomic_mass = new ConstantValue(
        "proton relative atomic mass",
        1.007276466621,
        ""
    );
    neutron_proton_mass_ratio = new ConstantValue(
        "neutron-proton mass ratio",
        1.00137841931,
        ""
    );
    conventional_value_of_watt_90 = new ConstantValue(
        "conventional value of watt-90",
        1.00000019553,
        "W"
    );
    conventional_value_of_volt_90 = new ConstantValue(
        "conventional value of volt-90",
        1.00000010666,
        "V"
    );
    conventional_value_of_ampere_90 = new ConstantValue(
        "conventional value of ampere-90",
        1.00000008887,
        "A"
    );
    conventional_value_of_coulomb_90 = new ConstantValue(
        "conventional value of coulomb-90",
        1.00000008887,
        "C"
    );
    conventional_value_of_henry_90 = new ConstantValue(
        "conventional value of henry-90",
        1.00000001779,
        "H"
    );
    conventional_value_of_ohm_90 = new ConstantValue(
        "conventional value of ohm-90",
        1.00000001779,
        "ohm"
    );
    conventional_value_of_farad_90 = new ConstantValue(
        "conventional value of farad-90",
        0.9999999822,
        "F"
    );
    proton_neutron_mass_ratio = new ConstantValue(
        "proton-neutron mass ratio",
        0.99862347812,
        ""
    );
    W_to_Z_mass_ratio = new ConstantValue("W to Z mass ratio", 0.88153, "");
    deuteron_g_factor = new ConstantValue("deuteron g factor", 0.8574382338, "");
    deuteron_mag_mom_to_nuclear_magneton_ratio = new ConstantValue(
        "deuteron mag. mom. to nuclear magneton ratio",
        0.8574382338,
        ""
    );
    deuteron_magn_moment_to_nuclear_magneton_ratio = new ConstantValue(
        "deuteron magn. moment to nuclear magneton ratio",
        0.8574382329,
        ""
    );
    Bohr_magneton_in_KT = new ConstantValue(
        "Bohr magneton in K/T",
        0.67171381563,
        "K T^-1"
    );
    neutron_tau_mass_ratio = new ConstantValue(
        "neutron-tau mass ratio",
        0.528779,
        ""
    );
    proton_tau_mass_ratio = new ConstantValue(
        "proton-tau mass ratio",
        0.528051,
        ""
    );
    electron_mass_energy_equivalent_in_MeV = new ConstantValue(
        "electron mass energy equivalent in MeV",
        0.51099895,
        "MeV"
    );
    natural_unit_of_energy_in_MeV = new ConstantValue(
        "natural unit of energy in MeV",
        0.51099895,
        "MeV"
    );
    natural_unit_of_momentum_in_MeVc = new ConstantValue(
        "natural unit of momentum in MeV/c",
        0.5109989461,
        "MeV/c"
    );
    natural_unit_of_momum_in_MeVc = new ConstantValue(
        "natural unit of mom.um in MeV/c",
        0.5109989461,
        "MeV/c"
    );
    deuteron_proton_mag_mom_ratio = new ConstantValue(
        "deuteron-proton mag. mom. ratio",
        0.30701220939,
        ""
    );
    deuteron_proton_magn_moment_ratio = new ConstantValue(
        "deuteron-proton magn. moment ratio",
        0.3070122084,
        ""
    );
    weak_mixing_angle = new ConstantValue("weak mixing angle", 0.2229, "");
    molar_Planck_constant_times_c = new ConstantValue(
        "molar Planck constant times c",
        0.119626565582,
        "J m mol^-1"
    );
    muon_mass_in_u = new ConstantValue("muon mass in u", 0.1134289259, "u");
    muon_proton_mass_ratio = new ConstantValue(
        "muon-proton mass ratio",
        0.1126095264,
        ""
    );
    muon_neutron_mass_ratio = new ConstantValue(
        "muon-neutron mass ratio",
        0.112454517,
        ""
    );
    muon_tau_mass_ratio = new ConstantValue("muon-tau mass ratio", 0.0594635, "");
    electron_volt_hartree_relationship = new ConstantValue(
        "electron volt-hartree relationship",
        0.036749322175655,
        "E_h"
    );
    nuclear_magneton_in_inverse_meters_per_tesla = new ConstantValue(
        "nuclear magneton in inverse meters per tesla",
        0.02542623432,
        "m^-1 T^-1"
    );
    nuclear_magneton_in_inverse_meter_per_tesla = new ConstantValue(
        "nuclear magneton in inverse meter per tesla",
        0.0254262341353,
        "m^-1 T^-1"
    );
    molar_volume_of_ideal_gas_27315_K_100_kPa = new ConstantValue(
        "molar volume of ideal gas (273.15 K, 100 kPa)",
        0.02271095464,
        "m^3 mol^-1"
    );
    molar_volume_of_ideal_gas_27315_K_101325_kPa = new ConstantValue(
        "molar volume of ideal gas (273.15 K, 101.325 kPa)",
        0.02241396954,
        "m^3 mol^-1"
    );
    inverse_meter_kelvin_relationship = new ConstantValue(
        "inverse meter-kelvin relationship",
        0.01438776877,
        "K"
    );
    second_radiation_constant = new ConstantValue(
        "second radiation constant",
        0.01438776877,
        "m K"
    );
    molar_mass_of_carbon_12 = new ConstantValue(
        "molar mass of carbon-12",
        0.0119999999958,
        "kg mol^-1"
    );
    fine_structure_constant = new ConstantValue(
        "fine-structure constant",
        0.0072973525693,
        ""
    );
    atomic_unit_of_current = new ConstantValue(
        "atomic unit of current",
        0.00662361823751,
        "A"
    );
    electron_muon_mass_ratio = new ConstantValue(
        "electron-muon mass ratio",
        0.00483633169,
        ""
    );
    alpha_particle_molar_mass = new ConstantValue(
        "alpha particle molar mass",
        0.0040015061777,
        "kg mol^-1"
    );
    triton_molar_mass = new ConstantValue(
        "triton molar mass",
        0.00301550071517,
        "kg mol^-1"
    );
    helion_molar_mass = new ConstantValue(
        "helion molar mass",
        0.00301493224613,
        "kg mol^-1"
    );
    Wien_wavelength_displacement_law_constant = new ConstantValue(
        "Wien wavelength displacement law constant",
        0.002897771955,
        "m K"
    );
    Wien_displacement_law_constant = new ConstantValue(
        "Wien displacement law constant",
        0.0028977685,
        "m K"
    );
    deuteron_molar_mass = new ConstantValue(
        "deuteron molar mass",
        0.00201355321205,
        "kg mol^-1"
    );
    tau_molar_mass = new ConstantValue("tau molar mass", 0.00190754, "kg mol^-1");
    triton_mag_mom_to_Bohr_magneton_ratio = new ConstantValue(
        "triton mag. mom. to Bohr magneton ratio",
        0.0016223936651,
        ""
    );
    proton_magn_moment_to_Bohr_magneton_ratio = new ConstantValue(
        "proton magn. moment to Bohr magneton ratio",
        0.001521032206,
        ""
    );
    proton_mag_mom_to_Bohr_magneton_ratio = new ConstantValue(
        "proton mag. mom. to Bohr magneton ratio",
        0.0015210322023,
        ""
    );
    shielded_proton_magn_moment_to_Bohr_magneton_ratio = new ConstantValue(
        "shielded proton magn. moment to Bohr magneton ratio",
        0.001520993132,
        ""
    );
    shielded_proton_mag_mom_to_Bohr_magneton_ratio = new ConstantValue(
        "shielded proton mag. mom. to Bohr magneton ratio",
        0.001520993128,
        ""
    );
    neutron_proton_mass_difference_in_u = new ConstantValue(
        "neutron-proton mass difference in u",
        0.00138844933,
        "u"
    );
    muon_mag_mom_anomaly = new ConstantValue(
        "muon mag. mom. anomaly",
        0.00116592089,
        ""
    );
    electron_magn_moment_anomaly = new ConstantValue(
        "electron magn. moment anomaly",
        0.0011596521859,
        ""
    );
    electron_mag_mom_anomaly = new ConstantValue(
        "electron mag. mom. anomaly",
        0.00115965218128,
        ""
    );
    neutron_electron_magn_moment_ratio = new ConstantValue(
        "neutron-electron magn. moment ratio",
        0.00104066882,
        ""
    );
    neutron_electron_mag_mom_ratio = new ConstantValue(
        "neutron-electron mag. mom. ratio",
        0.00104066882,
        ""
    );
    neutron_molar_mass = new ConstantValue(
        "neutron molar mass",
        0.0010086649156,
        "kg mol^-1"
    );
    proton_molar_mass = new ConstantValue(
        "proton molar mass",
        0.00100727646627,
        "kg mol^-1"
    );
    molar_mass_constant = new ConstantValue(
        "molar mass constant",
        0.00099999999965,
        "kg mol^-1"
    );
    quantum_of_circulation_times_2 = new ConstantValue(
        "quantum of circulation times 2",
        0.00072738951032,
        "m^2 s^-1"
    );
    electron_mass_in_u = new ConstantValue(
        "electron mass in u",
        0.000548579909065,
        "u"
    );
    electron_relative_atomic_mass = new ConstantValue(
        "electron relative atomic mass",
        0.000548579909065,
        ""
    );
    electron_proton_mass_ratio = new ConstantValue(
        "electron-proton mass ratio",
        0.000544617021487,
        ""
    );
    electron_neutron_mass_ratio = new ConstantValue(
        "electron-neutron mass ratio",
        0.00054386734424,
        ""
    );
    deuteron_mag_mom_to_Bohr_magneton_ratio = new ConstantValue(
        "deuteron mag. mom. to Bohr magneton ratio",
        0.000466975457,
        ""
    );
    deuteron_magn_moment_to_Bohr_magneton_ratio = new ConstantValue(
        "deuteron magn. moment to Bohr magneton ratio",
        0.0004669754567,
        ""
    );
    nuclear_magneton_in_KT = new ConstantValue(
        "nuclear magneton in K/T",
        0.00036582677756,
        "K T^-1"
    );
    quantum_of_circulation = new ConstantValue(
        "quantum of circulation",
        0.00036369475516,
        "m^2 s^-1"
    );
    electron_tau_mass_ratio = new ConstantValue(
        "electron-tau mass ratio",
        0.000287585,
        ""
    );
    electron_deuteron_mass_ratio = new ConstantValue(
        "electron-deuteron mass ratio",
        0.0002724437107462,
        ""
    );
    electron_helion_mass_ratio = new ConstantValue(
        "electron-helion mass ratio",
        0.0001819543074573,
        ""
    );
    electron_triton_mass_ratio = new ConstantValue(
        "electron-triton mass ratio",
        0.0001819200062251,
        ""
    );
    electron_to_alpha_particle_mass_ratio = new ConstantValue(
        "electron to alpha particle mass ratio",
        0.0001370933554787,
        ""
    );
    muon_molar_mass = new ConstantValue(
        "muon molar mass",
        0.0001134289259,
        "kg mol^-1"
    );
    Boltzmann_constant_in_eVK = new ConstantValue(
        "Boltzmann constant in eV/K",
        8.617333262e-5,
        "eV K^-1"
    );
    kelvin_electron_volt_relationship = new ConstantValue(
        "kelvin-electron volt relationship",
        8.617333262e-5,
        "eV"
    );
    conductance_quantum = new ConstantValue(
        "conductance quantum",
        7.748091729e-5,
        "S"
    );
    helion_shielding_shift = new ConstantValue(
        "helion shielding shift",
        5.996743e-5,
        ""
    );
    Bohr_magneton_in_eVT = new ConstantValue(
        "Bohr magneton in eV/T",
        5.788381806e-5,
        "eV T^-1"
    );
    proton_magn_shielding_correction = new ConstantValue(
        "proton magn. shielding correction",
        2.5689e-5,
        ""
    );
    proton_mag_shielding_correction = new ConstantValue(
        "proton mag. shielding correction",
        2.5689e-5,
        ""
    );
    molar_volume_of_silicon = new ConstantValue(
        "molar volume of silicon",
        1.205883199e-5,
        "m^3 mol^-1"
    );
    Fermi_coupling_constant = new ConstantValue(
        "Fermi coupling constant",
        1.1663787e-5,
        "GeV^-2"
    );
    kelvin_hartree_relationship = new ConstantValue(
        "kelvin-hartree relationship",
        3.1668115634556e-6,
        "E_h"
    );
    mag_constant = new ConstantValue("mag. constant", 1.25663706212e-6, "N A^-2");
    vacuum_mag_permeability = new ConstantValue(
        "vacuum mag. permeability",
        1.25663706212e-6,
        "N A^-2"
    );
    magn_constant = new ConstantValue(
        "magn. constant",
        1.2566370614e-6,
        "N A^-2"
    );
    inverse_meter_electron_volt_relationship = new ConstantValue(
        "inverse meter-electron volt relationship",
        1.239841984e-6,
        "eV"
    );
    electron_molar_mass = new ConstantValue(
        "electron molar mass",
        5.4857990888e-7,
        "kg mol^-1"
    );
    atomic_unit_of_force = new ConstantValue(
        "atomic unit of force",
        8.2387234983e-8,
        "N"
    );
    Stefan_Boltzmann_constant = new ConstantValue(
        "Stefan-Boltzmann constant",
        5.670374419e-8,
        "W m^-2 K^-4"
    );
    inverse_meter_hartree_relationship = new ConstantValue(
        "inverse meter-hartree relationship",
        4.556335252912e-8,
        "E_h"
    );
    nuclear_magneton_in_eVT = new ConstantValue(
        "nuclear magneton in eV/T",
        3.15245125844e-8,
        "eV T^-1"
    );
    hartree_atomic_mass_unit_relationship = new ConstantValue(
        "hartree-atomic mass unit relationship",
        2.92126232205e-8,
        "u"
    );
    shielding_difference_of_t_and_p_in_HT = new ConstantValue(
        "shielding difference of t and p in HT",
        2.414e-8,
        ""
    );
    Planck_mass = new ConstantValue("Planck mass", 2.176434e-8, "kg");
    shielding_difference_of_d_and_p_in_HD = new ConstantValue(
        "shielding difference of d and p in HD",
        2.02e-8,
        ""
    );
    hertz_inverse_meter_relationship = new ConstantValue(
        "hertz-inverse meter relationship",
        3.3356409519815204e-9,
        "m^-1"
    );
    electron_volt_atomic_mass_unit_relationship = new ConstantValue(
        "electron volt-atomic mass unit relationship",
        1.07354410233e-9,
        "u"
    );
    alpha_particle_mass_energy_equivalent = new ConstantValue(
        "alpha particle mass energy equivalent",
        5.9719201914e-10,
        "J"
    );
    lattice_parameter_of_silicon = new ConstantValue(
        "lattice parameter of silicon",
        5.431020511e-10,
        "m"
    );
    triton_mass_energy_equivalent = new ConstantValue(
        "triton mass energy equivalent",
        4.500387806e-10,
        "J"
    );
    helion_mass_energy_equivalent = new ConstantValue(
        "helion mass energy equivalent",
        4.4995394125e-10,
        "J"
    );
    molar_Planck_constant = new ConstantValue(
        "molar Planck constant",
        3.990312712e-10,
        "J Hz^-1 mol^-1"
    );
    deuteron_mass_energy_equivalent = new ConstantValue(
        "deuteron mass energy equivalent",
        3.00506323102e-10,
        "J"
    );
    tau_mass_energy_equivalent = new ConstantValue(
        "tau mass energy equivalent",
        2.84684e-10,
        "J"
    );
    lattice_spacing_of_silicon = new ConstantValue(
        "lattice spacing of silicon",
        1.920155762e-10,
        "m"
    );
    lattice_spacing_of_ideal_Si_220 = new ConstantValue(
        "lattice spacing of ideal Si (220)",
        1.920155716e-10,
        "m"
    );
    lattice_spacing_of_silicon_220 = new ConstantValue(
        "{220} lattice spacing of silicon",
        1.920155714e-10,
        "m"
    );
    neutron_mass_energy_equivalent = new ConstantValue(
        "neutron mass energy equivalent",
        1.50534976287e-10,
        "J"
    );
    proton_mass_energy_equivalent = new ConstantValue(
        "proton mass energy equivalent",
        1.50327761598e-10,
        "J"
    );
    atomic_mass_constant_energy_equivalent = new ConstantValue(
        "atomic mass constant energy equivalent",
        1.4924180856e-10,
        "J"
    );
    atomic_mass_unit_joule_relationship = new ConstantValue(
        "atomic mass unit-joule relationship",
        1.4924180856e-10,
        "J"
    );
    atomic_unit_of_permittivity = new ConstantValue(
        "atomic unit of permittivity",
        1.11265005545e-10,
        "F m^-1"
    );
    Angstrom_star = new ConstantValue("Angstrom star", 1.00001495e-10, "m");
    Newtonian_constant_of_gravitation = new ConstantValue(
        "Newtonian constant of gravitation",
        6.6743e-11,
        "m^3 kg^-1 s^-2"
    );
    atomic_unit_of_length = new ConstantValue(
        "atomic unit of length",
        5.29177210903e-11,
        "m"
    );
    Bohr_radius = new ConstantValue("Bohr radius", 5.29177210903e-11, "m");
    hertz_kelvin_relationship = new ConstantValue(
        "hertz-kelvin relationship",
        4.799243073e-11,
        "K"
    );
    muon_mass_energy_equivalent = new ConstantValue(
        "muon mass energy equivalent",
        1.692833804e-11,
        "J"
    );
    electric_constant = new ConstantValue(
        "electric constant",
        8.8541878128e-12,
        "F m^-1"
    );
    vacuum_electric_permittivity = new ConstantValue(
        "vacuum electric permittivity",
        8.8541878128e-12,
        "F m^-1"
    );
    Compton_wavelength = new ConstantValue(
        "Compton wavelength",
        2.42631023867e-12,
        "m"
    );
    natural_unit_of_length = new ConstantValue(
        "natural unit of length",
        3.8615926796e-13,
        "m"
    );
    reduced_Compton_wavelength = new ConstantValue(
        "reduced Compton wavelength",
        3.8615926796e-13,
        "m"
    );
    Compton_wavelength_over_2_pi = new ConstantValue(
        "Compton wavelength over 2 pi",
        3.8615926764e-13,
        "m"
    );
    neutron_proton_mass_difference_energy_equivalent = new ConstantValue(
        "neutron-proton mass difference energy equivalent",
        2.07214689e-13,
        "J"
    );
    Mo_x_unit = new ConstantValue("Mo x unit", 1.00209952e-13, "m");
    Cu_x_unit = new ConstantValue("Cu x unit", 1.00207697e-13, "m");
    kelvin_atomic_mass_unit_relationship = new ConstantValue(
        "kelvin-atomic mass unit relationship",
        9.2510873014e-14,
        "u"
    );
    electron_mass_energy_equivalent = new ConstantValue(
        "electron mass energy equivalent",
        8.1871057769e-14,
        "J"
    );
    natural_unit_of_energy = new ConstantValue(
        "natural unit of energy",
        8.1871057769e-14,
        "J"
    );
    muon_Compton_wavelength = new ConstantValue(
        "muon Compton wavelength",
        1.17344411e-14,
        "m"
    );
    hertz_electron_volt_relationship = new ConstantValue(
        "hertz-electron volt relationship",
        4.135667696e-15,
        "eV"
    );
    Planck_constant_in_eVHz = new ConstantValue(
        "Planck constant in eV/Hz",
        4.135667696e-15,
        "eV Hz^-1"
    );
    Planck_constant_in_eV_s = new ConstantValue(
        "Planck constant in eV s",
        4.135667662e-15,
        "eV s"
    );
    classical_electron_radius = new ConstantValue(
        "classical electron radius",
        2.8179403262e-15,
        "m"
    );
    deuteron_rms_charge_radius = new ConstantValue(
        "deuteron rms charge radius",
        2.12799e-15,
        "m"
    );
    magn_flux_quantum = new ConstantValue(
        "magn. flux quantum",
        2.067833848e-15,
        "Wb"
    );
    mag_flux_quantum = new ConstantValue(
        "mag. flux quantum",
        2.067833848e-15,
        "Wb"
    );
    muon_Compton_wavelength_over_2_pi = new ConstantValue(
        "muon Compton wavelength over 2 pi",
        1.867594308e-15,
        "m"
    );
    reduced_muon_Compton_wavelength = new ConstantValue(
        "reduced muon Compton wavelength",
        1.867594306e-15,
        "m"
    );
    inverse_meter_atomic_mass_unit_relationship = new ConstantValue(
        "inverse meter-atomic mass unit relationship",
        1.3310250501e-15,
        "u"
    );
    proton_Compton_wavelength = new ConstantValue(
        "proton Compton wavelength",
        1.32140985539e-15,
        "m"
    );
    neutron_Compton_wavelength = new ConstantValue(
        "neutron Compton wavelength",
        1.31959090581e-15,
        "m"
    );
    proton_rms_charge_radius = new ConstantValue(
        "proton rms charge radius",
        8.414e-16,
        "m"
    );
    tau_Compton_wavelength = new ConstantValue(
        "tau Compton wavelength",
        6.97771e-16,
        "m"
    );
    natural_unit_of_action_in_eV_s = new ConstantValue(
        "natural unit of action in eV s",
        6.582119569e-16,
        "eV s"
    );
    reduced_Planck_constant_in_eV_s = new ConstantValue(
        "reduced Planck constant in eV s",
        6.582119569e-16,
        "eV s"
    );
    Planck_constant_over_2_pi_in_eV_s = new ConstantValue(
        "Planck constant over 2 pi in eV s",
        6.582119514e-16,
        "eV s"
    );
    first_radiation_constant = new ConstantValue(
        "first radiation constant",
        3.741771852e-16,
        "W m^2"
    );
    reduced_proton_Compton_wavelength = new ConstantValue(
        "reduced proton Compton wavelength",
        2.10308910336e-16,
        "m"
    );
    proton_Compton_wavelength_over_2_pi = new ConstantValue(
        "proton Compton wavelength over 2 pi",
        2.10308910109e-16,
        "m"
    );
    reduced_neutron_Compton_wavelength = new ConstantValue(
        "reduced neutron Compton wavelength",
        2.1001941552e-16,
        "m"
    );
    neutron_Compton_wavelength_over_2_pi = new ConstantValue(
        "neutron Compton wavelength over 2 pi",
        2.1001941536e-16,
        "m"
    );
    hertz_hartree_relationship = new ConstantValue(
        "hertz-hartree relationship",
        1.519829846057e-16,
        "E_h"
    );
    first_radiation_constant_for_spectral_radiance = new ConstantValue(
        "first radiation constant for spectral radiance",
        1.191042972e-16,
        "W m^2 sr^-1"
    );
    tau_Compton_wavelength_over_2_pi = new ConstantValue(
        "tau Compton wavelength over 2 pi",
        1.11056e-16,
        "m"
    );
    reduced_tau_Compton_wavelength = new ConstantValue(
        "reduced tau Compton wavelength",
        1.110538e-16,
        "m"
    );
    atomic_unit_of_time = new ConstantValue(
        "atomic unit of time",
        2.4188843265857e-17,
        "s"
    );
    joule_kilogram_relationship = new ConstantValue(
        "joule-kilogram relationship",
        1.1126500560536185e-17,
        "kg"
    );
    atomic_unit_of_energy = new ConstantValue(
        "atomic unit of energy",
        4.3597447222071e-18,
        "J"
    );
    Hartree_energy = new ConstantValue(
        "Hartree energy",
        4.3597447222071e-18,
        "J"
    );
    hartree_joule_relationship = new ConstantValue(
        "hartree-joule relationship",
        4.3597447222071e-18,
        "J"
    );
    Rydberg_constant_times_hc_in_J = new ConstantValue(
        "Rydberg constant times hc in J",
        2.1798723611035e-18,
        "J"
    );
    atomic_unit_of_charge = new ConstantValue(
        "atomic unit of charge",
        1.602176634e-19,
        "C"
    );
    electron_volt = new ConstantValue("electron volt", 1.602176634e-19, "J");
    electron_volt_joule_relationship = new ConstantValue(
        "electron volt-joule relationship",
        1.602176634e-19,
        "J"
    );
    elementary_charge = new ConstantValue(
        "elementary charge",
        1.602176634e-19,
        "C"
    );
    natural_unit_of_time = new ConstantValue(
        "natural unit of time",
        1.28808866819e-21,
        "s"
    );
    natural_unit_of_momentum = new ConstantValue(
        "natural unit of momentum",
        2.730924488e-22,
        "kg m s^-1"
    );
    natural_unit_of_momum = new ConstantValue(
        "natural unit of mom.um",
        2.730924488e-22,
        "kg m s^-1"
    );
    atomic_unit_of_mag_dipole_mom = new ConstantValue(
        "atomic unit of mag. dipole mom.",
        1.85480201566e-23,
        "J T^-1"
    );
    atomic_unit_of_magn_dipole_moment = new ConstantValue(
        "atomic unit of magn. dipole moment",
        1.8548019e-23,
        "J T^-1"
    );
    Boltzmann_constant = new ConstantValue(
        "Boltzmann constant",
        1.380649e-23,
        "J K^-1"
    );
    kelvin_joule_relationship = new ConstantValue(
        "kelvin-joule relationship",
        1.380649e-23,
        "J"
    );
    Bohr_magneton = new ConstantValue(
        "Bohr magneton",
        9.2740100783e-24,
        "J T^-1"
    );
    hertz_atomic_mass_unit_relationship = new ConstantValue(
        "hertz-atomic mass unit relationship",
        4.4398216652e-24,
        "u"
    );
    atomic_unit_of_momentum = new ConstantValue(
        "atomic unit of momentum",
        1.9928519141e-24,
        "kg m s^-1"
    );
    atomic_unit_of_momum = new ConstantValue(
        "atomic unit of mom.um",
        1.992851882e-24,
        "kg m s^-1"
    );
    inverse_meter_joule_relationship = new ConstantValue(
        "inverse meter-joule relationship",
        1.986445857e-25,
        "J"
    );
    triton_mag_mom = new ConstantValue(
        "triton mag. mom.",
        1.5046095202e-26,
        "J T^-1"
    );
    proton_mag_mom = new ConstantValue(
        "proton mag. mom.",
        1.41060679736e-26,
        "J T^-1"
    );
    proton_magn_moment = new ConstantValue(
        "proton magn. moment",
        1.41060671e-26,
        "J T^-1"
    );
    shielded_proton_mag_mom = new ConstantValue(
        "shielded proton mag. mom.",
        1.41057056e-26,
        "J T^-1"
    );
    shielded_proton_magn_moment = new ConstantValue(
        "shielded proton magn. moment",
        1.41057047e-26,
        "J T^-1"
    );
    alpha_particle_mass = new ConstantValue(
        "alpha particle mass",
        6.6446573357e-27,
        "kg"
    );
    nuclear_magneton = new ConstantValue(
        "nuclear magneton",
        5.0507837461e-27,
        "J T^-1"
    );
    triton_mass = new ConstantValue("triton mass", 5.0073567446e-27, "kg");
    helion_mass = new ConstantValue("helion mass", 5.0064127796e-27, "kg");
    deuteron_mag_mom = new ConstantValue(
        "deuteron mag. mom.",
        4.330735094e-27,
        "J T^-1"
    );
    deuteron_magn_moment = new ConstantValue(
        "deuteron magn. moment",
        4.33073482e-27,
        "J T^-1"
    );
    deuteron_mass = new ConstantValue("deuteron mass", 3.3435837724e-27, "kg");
    tau_mass = new ConstantValue("tau mass", 3.16754e-27, "kg");
    neutron_mass = new ConstantValue("neutron mass", 1.67492749804e-27, "kg");
    proton_mass = new ConstantValue("proton mass", 1.67262192369e-27, "kg");
    atomic_mass_constant = new ConstantValue(
        "atomic mass constant",
        1.6605390666e-27,
        "kg"
    );
    atomic_mass_unit_kilogram_relationship = new ConstantValue(
        "atomic mass unit-kilogram relationship",
        1.6605390666e-27,
        "kg"
    );
    unified_atomic_mass_unit = new ConstantValue(
        "unified atomic mass unit",
        1.6605390666e-27,
        "kg"
    );
    muon_mass = new ConstantValue("muon mass", 1.883531627e-28, "kg");
    atomic_unit_of_magnetizability = new ConstantValue(
        "atomic unit of magnetizability",
        7.8910366008e-29,
        "J T^-2"
    );
    Thomson_cross_section = new ConstantValue(
        "Thomson cross section",
        6.6524587321e-29,
        "m^2"
    );
    atomic_unit_of_electric_dipole_mom = new ConstantValue(
        "atomic unit of electric dipole mom.",
        8.4783536255e-30,
        "C m"
    );
    atomic_unit_of_electric_dipole_moment = new ConstantValue(
        "atomic unit of electric dipole moment",
        8.47835309e-30,
        "C m"
    );
    neutron_proton_mass_difference = new ConstantValue(
        "neutron-proton mass difference",
        2.30557435e-30,
        "kg"
    );
    atomic_unit_of_mass = new ConstantValue(
        "atomic unit of mass",
        9.1093837015e-31,
        "kg"
    );
    electron_mass = new ConstantValue("electron mass", 9.1093837015e-31, "kg");
    natural_unit_of_mass = new ConstantValue(
        "natural unit of mass",
        9.1093837015e-31,
        "kg"
    );
    hertz_joule_relationship = new ConstantValue(
        "hertz-joule relationship",
        6.62607015e-34,
        "J"
    );
    Planck_constant = new ConstantValue(
        "Planck constant",
        6.62607015e-34,
        "J Hz^-1"
    );
    atomic_unit_of_action = new ConstantValue(
        "atomic unit of action",
        1.054571817e-34,
        "J s"
    );
    natural_unit_of_action = new ConstantValue(
        "natural unit of action",
        1.054571817e-34,
        "J s"
    );
    reduced_Planck_constant = new ConstantValue(
        "reduced Planck constant",
        1.054571817e-34,
        "J s"
    );
    Planck_constant_over_2_pi = new ConstantValue(
        "Planck constant over 2 pi",
        1.0545718e-34,
        "J s"
    );
    hartree_kilogram_relationship = new ConstantValue(
        "hartree-kilogram relationship",
        4.8508702095432e-35,
        "kg"
    );
    Planck_length = new ConstantValue("Planck length", 1.616255e-35, "m");
    electron_volt_kilogram_relationship = new ConstantValue(
        "electron volt-kilogram relationship",
        1.782661921e-36,
        "kg"
    );
    Newtonian_constant_of_gravitation_over_h_bar_c = new ConstantValue(
        "Newtonian constant of gravitation over h-bar c",
        6.70883e-39,
        "(GeV/c^2)^-2"
    );
    atomic_unit_of_electric_quadrupole_mom = new ConstantValue(
        "atomic unit of electric quadrupole mom.",
        4.4865515246e-40,
        "C m^2"
    );
    atomic_unit_of_electric_quadrupole_moment = new ConstantValue(
        "atomic unit of electric quadrupole moment",
        4.48655124e-40,
        "C m^2"
    );
    kelvin_kilogram_relationship = new ConstantValue(
        "kelvin-kilogram relationship",
        1.536179187e-40,
        "kg"
    );
    atomic_unit_of_electric_polarizability = new ConstantValue(
        "atomic unit of electric polarizability",
        1.64877727436e-41,
        "C^2 m^2 J^-1"
    );
    atomic_unit_of_electric_polarizablity = new ConstantValue(
        "atomic unit of electric polarizablity",
        1.648777274e-41,
        "C^2 m^2 J^-1"
    );
    inverse_meter_kilogram_relationship = new ConstantValue(
        "inverse meter-kilogram relationship",
        2.210219094e-42,
        "kg"
    );
    Planck_time = new ConstantValue("Planck time", 5.391247e-44, "s");
    hertz_kilogram_relationship = new ConstantValue(
        "hertz-kilogram relationship",
        7.372497323e-51,
        "kg"
    );
    atomic_unit_of_1st_hyperpolarizablity = new ConstantValue(
        "atomic unit of 1st hyperpolarizablity",
        3.20636151e-53,
        "C^3 m^3 J^-2"
    );
    atomic_unit_of_1st_hyperpolarizability = new ConstantValue(
        "atomic unit of 1st hyperpolarizability",
        3.2063613061e-53,
        "C^3 m^3 J^-2"
    );
    atomic_unit_of_2nd_hyperpolarizablity = new ConstantValue(
        "atomic unit of 2nd hyperpolarizablity",
        6.2353808e-65,
        "C^4 m^4 J^-3"
    );
    atomic_unit_of_2nd_hyperpolarizability = new ConstantValue(
        "atomic unit of 2nd hyperpolarizability",
        6.2353799905e-65,
        "C^4 m^4 J^-3"
    );
    neutron_magn_moment = new ConstantValue(
        "neutron magn. moment",
        -9.6623645e-27,
        "J T^-1"
    );
    neutron_mag_mom = new ConstantValue(
        "neutron mag. mom.",
        -9.6623651e-27,
        "J T^-1"
    );
    shielded_helion_magn_moment = new ConstantValue(
        "shielded helion magn. moment",
        -1.074553024e-26,
        "J T^-1"
    );
    shielded_helion_mag_mom = new ConstantValue(
        "shielded helion mag. mom.",
        -1.07455309e-26,
        "J T^-1"
    );
    helion_mag_mom = new ConstantValue(
        "helion mag. mom.",
        -1.074617532e-26,
        "J T^-1"
    );
    muon_magn_moment = new ConstantValue(
        "muon magn. moment",
        -4.49044799e-26,
        "J T^-1"
    );
    muon_mag_mom = new ConstantValue("muon mag. mom.", -4.4904483e-26, "J T^-1");
    electron_magn_moment = new ConstantValue(
        "electron magn. moment",
        -9.28476412e-24,
        "J T^-1"
    );
    electron_mag_mom = new ConstantValue(
        "electron mag. mom.",
        -9.2847647043e-24,
        "J T^-1"
    );
    deuteron_electron_magn_moment_ratio = new ConstantValue(
        "deuteron-electron magn. moment ratio",
        -0.0004664345548,
        ""
    );
    deuteron_electron_mag_mom_ratio = new ConstantValue(
        "deuteron-electron mag. mom. ratio",
        -0.0004664345551,
        ""
    );
    neutron_magn_moment_to_Bohr_magneton_ratio = new ConstantValue(
        "neutron magn. moment to Bohr magneton ratio",
        -0.00104187563,
        ""
    );
    neutron_mag_mom_to_Bohr_magneton_ratio = new ConstantValue(
        "neutron mag. mom. to Bohr magneton ratio",
        -0.00104187563,
        ""
    );
    shielded_helion_mag_mom_to_Bohr_magneton_ratio = new ConstantValue(
        "shielded helion mag. mom. to Bohr magneton ratio",
        -0.001158671471,
        ""
    );
    shielded_helion_magn_moment_to_Bohr_magneton_ratio = new ConstantValue(
        "shielded helion magn. moment to Bohr magneton ratio",
        -0.001158671474,
        ""
    );
    helion_mag_mom_to_Bohr_magneton_ratio = new ConstantValue(
        "helion mag. mom. to Bohr magneton ratio",
        -0.001158740958,
        ""
    );
    triton_electron_mag_mom_ratio = new ConstantValue(
        "triton-electron mag. mom. ratio",
        -0.001620514423,
        ""
    );
    muon_magn_moment_to_Bohr_magneton_ratio = new ConstantValue(
        "muon magn. moment to Bohr magneton ratio",
        -0.00484197045,
        ""
    );
    muon_mag_mom_to_Bohr_magneton_ratio = new ConstantValue(
        "muon mag. mom. to Bohr magneton ratio",
        -0.00484197047,
        ""
    );
    deuteron_neutron_magn_moment_ratio = new ConstantValue(
        "deuteron-neutron magn. moment ratio",
        -0.44820652,
        ""
    );
    deuteron_neutron_mag_mom_ratio = new ConstantValue(
        "deuteron-neutron mag. mom. ratio",
        -0.44820653,
        ""
    );
    neutron_proton_magn_moment_ratio = new ConstantValue(
        "neutron-proton magn. moment ratio",
        -0.68497934,
        ""
    );
    neutron_proton_mag_mom_ratio = new ConstantValue(
        "neutron-proton mag. mom. ratio",
        -0.68497934,
        ""
    );
    neutron_to_shielded_proton_magn_moment_ratio = new ConstantValue(
        "neutron to shielded proton magn. moment ratio",
        -0.68499694,
        ""
    );
    neutron_to_shielded_proton_mag_mom_ratio = new ConstantValue(
        "neutron to shielded proton mag. mom. ratio",
        -0.68499694,
        ""
    );
    shielded_helion_to_proton_mag_mom_ratio = new ConstantValue(
        "shielded helion to proton mag. mom. ratio",
        -0.7617665618,
        ""
    );
    shielded_helion_to_proton_magn_moment_ratio = new ConstantValue(
        "shielded helion to proton magn. moment ratio",
        -0.761766562,
        ""
    );
    shielded_helion_to_shielded_proton_magn_moment_ratio = new ConstantValue(
        "shielded helion to shielded proton magn. moment ratio",
        -0.7617861313,
        ""
    );
    shielded_helion_to_shielded_proton_mag_mom_ratio = new ConstantValue(
        "shielded helion to shielded proton mag. mom. ratio",
        -0.7617861313,
        ""
    );
    electron_mag_mom_to_Bohr_magneton_ratio = new ConstantValue(
        "electron mag. mom. to Bohr magneton ratio",
        -1.00115965218128,
        ""
    );
    electron_magn_moment_to_Bohr_magneton_ratio = new ConstantValue(
        "electron magn. moment to Bohr magneton ratio",
        -1.0011596521859,
        ""
    );
    Sackur_Tetrode_constant_1_K_100_kPa = new ConstantValue(
        "Sackur-Tetrode constant (1 K, 100 kPa)",
        -1.15170753706,
        ""
    );
    Sackur_Tetrode_constant_1_K_101325_kPa = new ConstantValue(
        "Sackur-Tetrode constant (1 K, 101.325 kPa)",
        -1.16487052358,
        ""
    );
    proton_neutron_magn_moment_ratio = new ConstantValue(
        "proton-neutron magn. moment ratio",
        -1.45989805,
        ""
    );
    proton_neutron_mag_mom_ratio = new ConstantValue(
        "proton-neutron mag. mom. ratio",
        -1.45989805,
        ""
    );
    triton_neutron_mag_mom_ratio = new ConstantValue(
        "triton-neutron mag. mom. ratio",
        -1.55718553,
        ""
    );
    neutron_magn_moment_to_nuclear_magneton_ratio = new ConstantValue(
        "neutron magn. moment to nuclear magneton ratio",
        -1.91304273,
        ""
    );
    neutron_mag_mom_to_nuclear_magneton_ratio = new ConstantValue(
        "neutron mag. mom. to nuclear magneton ratio",
        -1.91304273,
        ""
    );
    electron_g_factor = new ConstantValue(
        "electron g factor",
        -2.00231930436256,
        ""
    );
    muon_g_factor = new ConstantValue("muon g factor", -2.0023318418, "");
    shielded_helion_mag_mom_to_nuclear_magneton_ratio = new ConstantValue(
        "shielded helion mag. mom. to nuclear magneton ratio",
        -2.127497719,
        ""
    );
    shielded_helion_magn_moment_to_nuclear_magneton_ratio = new ConstantValue(
        "shielded helion magn. moment to nuclear magneton ratio",
        -2.127497723,
        ""
    );
    helion_mag_mom_to_nuclear_magneton_ratio = new ConstantValue(
        "helion mag. mom. to nuclear magneton ratio",
        -2.127625307,
        ""
    );
    muon_proton_magn_moment_ratio = new ConstantValue(
        "muon-proton magn. moment ratio",
        -3.183345118,
        ""
    );
    muon_proton_mag_mom_ratio = new ConstantValue(
        "muon-proton mag. mom. ratio",
        -3.183345142,
        ""
    );
    neutron_g_factor = new ConstantValue("neutron g factor", -3.82608545, "");
    helion_g_factor = new ConstantValue("helion g factor", -4.255250615, "");
    muon_magn_moment_to_nuclear_magneton_ratio = new ConstantValue(
        "muon magn. moment to nuclear magneton ratio",
        -8.89059698,
        ""
    );
    muon_mag_mom_to_nuclear_magneton_ratio = new ConstantValue(
        "muon mag. mom. to nuclear magneton ratio",
        -8.89059703,
        ""
    );
    electron_proton_magn_moment_ratio = new ConstantValue(
        "electron-proton magn. moment ratio",
        -658.2106862,
        ""
    );
    electron_proton_mag_mom_ratio = new ConstantValue(
        "electron-proton mag. mom. ratio",
        -658.21068789,
        ""
    );
    electron_to_shielded_proton_magn_moment_ratio = new ConstantValue(
        "electron to shielded proton magn. moment ratio",
        -658.2275956,
        ""
    );
    electron_to_shielded_proton_mag_mom_ratio = new ConstantValue(
        "electron to shielded proton mag. mom. ratio",
        -658.2275971,
        ""
    );
    electron_magn_moment_to_nuclear_magneton_ratio = new ConstantValue(
        "electron magn. moment to nuclear magneton ratio",
        -1838.28197107,
        ""
    );
    electron_mag_mom_to_nuclear_magneton_ratio = new ConstantValue(
        "electron mag. mom. to nuclear magneton ratio",
        -1838.28197188,
        ""
    );
    electron_deuteron_mag_mom_ratio = new ConstantValue(
        "electron-deuteron mag. mom. ratio",
        -2143.9234915,
        ""
    );
    electron_deuteron_magn_moment_ratio = new ConstantValue(
        "electron-deuteron magn. moment ratio",
        -2143.923493,
        ""
    );
    electron_charge_to_mass_quotient = new ConstantValue(
        "electron charge to mass quotient",
        -175882001076.0,
        "C kg^-1"
    );

    constructor() { }
}

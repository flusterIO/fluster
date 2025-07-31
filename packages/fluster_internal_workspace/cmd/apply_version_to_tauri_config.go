package cmd

import (
	"os"

	"github.com/charmbracelet/log"
	"github.com/flusterIo/fluster_internal_workspace/internal/utils"
	"github.com/spf13/cobra"
	"github.com/tidwall/gjson"
	"github.com/tidwall/sjson"
)

// rootCmd represents the base command when called without any subcommands
var applyVersionToTauriCommand = &cobra.Command{
	Use:   "tauri_version_match",
	Short: "Applies the tauri package.json version to tauri config.",
	Long:  `Applies the tauri package.json version to tauri config.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	Run: func(cmd *cobra.Command, args []string) {
		packageJson := utils.GetFlusterPackageJsonPath()
		tauriConfig := utils.GetTauriConfigPath()
		packageJsonData, err := os.ReadFile(packageJson)
		if err != nil {
			log.Fatal(err)
		}
		tauriConfigData, err := os.ReadFile(tauriConfig)
		if err != nil {
			log.Fatal(err)
		}
		version := gjson.ParseBytes(packageJsonData).Get("version").String()

		newTauriConfigData, err := sjson.SetBytes(tauriConfigData, "version", version)
		if err != nil {
			log.Fatal(err)
		}
		os.WriteFile(tauriConfig, newTauriConfigData, 0777)

	},
}

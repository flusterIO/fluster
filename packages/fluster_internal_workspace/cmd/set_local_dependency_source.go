package cmd

import (
	"fmt"
	"os"
	"path"

	"github.com/charmbracelet/log"
	"github.com/flusterIo/fluster_internal_workspace/internal/utils"
	"github.com/spf13/cobra"
	"github.com/tidwall/gjson"
	"github.com/tidwall/sjson"
)

type LocalDependency struct {
	SubPath string
	Name    string
}

func applyDependency(packageJsonString string, dependencyType string, localDep LocalDependency, toVersion bool) string {
	pj := gjson.Parse(packageJsonString)
	dependencyObject := pj.Get(dependencyType)
	value := "workspace:*"
	if toVersion {
		depPackageJsonData, err := os.ReadFile(path.Join(utils.GetNativeRoot(), localDep.SubPath, "package.json"))
		if err != nil {
			log.Fatal(err)
		}
		value = gjson.ParseBytes(depPackageJsonData).Get("version").String()
	}
	if dependencyObject.Exists() {
		println("Exists")
		depPath := fmt.Sprintf("%s.%s", dependencyType, localDep.Name)
		println("Dep Path", depPath)
		localDepData := pj.Get(depPath)
		if localDepData.Exists() {
			_packageJsonString, err := sjson.Set(packageJsonString, depPath, value)
			if err != nil {
				log.Fatal(err)
			} else {
				packageJsonString = _packageJsonString
			}
		}
	}
	return packageJsonString
}

// FIXME: Come back here and figure out how to include a slash in the key using gjson so I can automatically toggle local dependency sources from make and overseer.
var setLocalDependencySourceCommand = &cobra.Command{
	Use:   "set_local_dependency_source",
	Short: "Sets local dependencies to workspace if no command, otherwise to their specified version. Use the version argument to apply local versions, defaults to applying workspace.",
	Long:  `Sets local dependencies to workspace if no command, otherwise to their specified version.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	Run: func(cmd *cobra.Command, args []string) {
		toVersion := (len(args) == 1) && (args[0] == "version")
		localDeps := []LocalDependency{
			{
				SubPath: "packages/fluster_developer",
				Name:    "@fluster\\.io/dev",
			},
		}
		packageJson := utils.GetFlusterPackageJsonPath()
		packageJsonData, err := os.ReadFile(packageJson)
		if err != nil {
			log.Fatal(err)
		}
		packageJsonString := string(packageJsonData)

		for _, dependencyType := range []string{"dependencies", "devDependencies", "peerDependencies"} {
			for _, localDep := range localDeps {
				packageJsonString = applyDependency(packageJsonString, dependencyType, localDep, toVersion)
				println(packageJsonString)

			}
		}
		os.WriteFile(packageJson, []byte(packageJsonString), 0777)
	},
}

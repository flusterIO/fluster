package actions

import (
	"os"
	"path"

	"github.com/charmbracelet/huh"
	"github.com/charmbracelet/log"
	"github.com/flusterIo/fluster_internal_workspace/internal/utils"
)

func handleError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func CreateCleanFeature() {
	var featureName string
	f := huh.NewForm(
		huh.NewGroup(
			huh.NewInput().Title("What's the name of the feature?").Value(&featureName),
		),
	)
	err := f.Run()
	handleError(err)
	featureDir := path.Join(utils.GetNativeRoot(), "apps", "fluster", "src", "features", featureName)
	handleError(os.MkdirAll(path.Join(featureDir, "data", "models"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "state", "actions"), 0777))
	handleError(os.MkdirAll(path.Join(utils.GetNativeRoot(), "apps", "fluster", "src-tauri", "features", featureName), 0777))
	log.SetReportTimestamp(false)
	log.Infof("✅ - Successfully created the %s feature in %s", featureName, featureDir)
}

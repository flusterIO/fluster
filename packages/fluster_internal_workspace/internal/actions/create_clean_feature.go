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
	featureDir := path.Join(utils.GetNativeRoot(), "apps", "fluster", "lib", "features", featureName)
	handleError(os.MkdirAll(path.Join(featureDir, "data", "models"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "data", "models"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation", "screens", "desktop"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation", "screens", "phone"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation", "screens", "tablet"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation", "screens", "responsive"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation", "widgets", "desktop"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation", "widgets", "phone"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation", "widgets", "tablet"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation", "widgets", "responsive"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "presentation", "state", "actions"), 0777))
	handleError(os.MkdirAll(path.Join(featureDir, "use_cases"), 0777))
	log.SetReportTimestamp(false)
	log.Infof("✅ - Successfully created the %s feature in %s", featureName, featureDir)
}

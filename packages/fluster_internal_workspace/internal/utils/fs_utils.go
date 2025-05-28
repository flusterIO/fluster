package utils

import (
	"os"
	"path"

	"github.com/charmbracelet/log"
)

func GetNativeRoot() string {
	nativeRoot := os.Getenv("FLUSTER_NATIVE_ROOT")
	if nativeRoot == "" {
		log.Fatal("No FLUSTER_NATIVE_ROOT environment variable found. Set this to the root of the workspace and try again.")
	}
	return nativeRoot
}

func FileExists(filename string) bool {
	_, err := os.Stat(filename)
	return !os.IsNotExist(err)
}

func FindPackageJsonParentDir(dirPath string) string {
	p := path.Join(dirPath, "package.json")
	if FileExists(p) {
		return dirPath
	}
	parentDir := path.Dir(p)
	if (parentDir != "") && (p != dirPath) {
		return FindPackageJsonParentDir(parentDir)
	}
	return ""
}

type PackagePathData struct {
	root_dir        string
	tasks_json_path string
}

func getTasksJsonPath(dir_name string) string {
	p := path.Join(dir_name, ".vscode", "tasks.json")
	if FileExists(p) {
		return p
	}
	return ""
}

func getPackagePathData(dir_name string) PackagePathData {
	return PackagePathData{
		root_dir:        dir_name,
		tasks_json_path: getTasksJsonPath(dir_name),
	}
}

func GetAllRootDirectories(rootDir string, sub_dirs []string) []PackagePathData {
	dirs := []PackagePathData{}
	for _, d := range sub_dirs {
		dir_paths, err := os.ReadDir(path.Join(rootDir, d))
		if err == nil {
			for _, dir_path := range dir_paths {
				if dir_path.Type().IsDir() {
					dirs = append(dirs, getPackagePathData(path.Join(rootDir, dir_path.Name())))
				}
			}
		}
	}
	return dirs
}

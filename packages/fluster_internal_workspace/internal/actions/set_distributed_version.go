package actions

import (
	"github.com/charmbracelet/log"
	"github.com/flusterIo/fluster_internal_workspace/internal/utils"
	"github.com/tidwall/gjson"
	"github.com/tidwall/sjson"
	"os"
	"path"
)

func SetDistributedVersion() {
	nativeRoot := utils.GetNativeRoot()
	input_data, err := os.ReadFile(path.Join(nativeRoot, "build_env.json"))
	if err != nil {
		log.Fatal(err)
	}
	j := gjson.ParseBytes(input_data)
	version := j.Get("distributedApiVersion").String()
	node_package_json_path := path.Join(nativeRoot, "packages", "fluster_ts", "package.json")
	node_package_json_data, err := os.ReadFile(node_package_json_path)
	if err != nil {
		log.Fatal(err)
	}
	new_data, err := sjson.SetBytes(node_package_json_data, "version", version)
	if err != nil {
		log.Fatal(err)
	}
	err = os.WriteFile(node_package_json_path, new_data, 0777)
	if err != nil {
		log.Fatal(err)
	}
}

package actions

import (
	"bytes"
	"embed"
	"os"
	"path"
	"strings"
	"text/template"

	"github.com/charmbracelet/log"
)

var (
	//go:embed "templates/*"
	templateFiles embed.FS
)

type ProtoFile struct {
	item os.DirEntry
}

func (x ProtoFile) FileName() string {
	return x.item.Name()
}

func (x ProtoFile) FileNameShort() string {
	return strings.Split(x.item.Name(), ".")[0]
}

func GenerateGrpcScript() {
	nativeRoot := os.Getenv("FLUSTER_NATIVE_ROOT")
	if nativeRoot == "" {
		log.Fatal("No FLUSTER_NATIVE_ROOT environment variable found. Set this to the root of the workspace and try again.")
	}
	protoRoot := path.Join(nativeRoot, "packages", "fluster_grpc", "src", "proto")
	files, err := os.ReadDir(protoRoot)
	if err != nil {
		log.Fatal(err)
	}
	protoFiles := []ProtoFile{}
	for _, item := range files {
		if !item.IsDir() {
			protoFiles = append(protoFiles, ProtoFile{item})
		}
	}
	for _, item := range protoFiles {
		println(item.FileName())
	}
	templ, err := template.ParseFS(templateFiles, "templates/**")
	if err != nil {
		log.Fatal(err)
	}
	var buf bytes.Buffer
	err = templ.ExecuteTemplate(&buf, "grpc_build_script.gosh", protoFiles)
	if err != nil {
		log.Fatal(err)
	}
	err = os.WriteFile(path.Join(nativeRoot, "packages", "fluster_grpc", "scripts", "distribute_proto.sh"), buf.Bytes(), 0777)
	if err != nil {
		log.Fatal(err)
	}
}

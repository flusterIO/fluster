package utils

import (
	"os"

	"github.com/charmbracelet/log"
)

func GetNativeRoot() string {
	nativeRoot := os.Getenv("FLUSTER_NATIVE_ROOT")
	if nativeRoot == "" {
		log.Fatal("No FLUSTER_NATIVE_ROOT environment variable found. Set this to the root of the workspace and try again.")
	}
	return nativeRoot
}

/*
Copyright © 2025 Andrew Mueller <aiglinski414@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
package cmd

import (
	"fmt"
	"os"
	"path"

	"github.com/charmbracelet/log"
	"github.com/flusterIo/fluster_internal_workspace/internal/utils"
	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var noCheckBindingsFileCmd = &cobra.Command{
	Use:   "nocheck_bindings",
	Short: "Prepends a tslint comment to bindings file.",
	Long:  `This is necessary for the bindings file to pass typecheck while still disallowing noImplicitAny elsewhere.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	Run: func(cmd *cobra.Command, args []string) {
		root := utils.GetNativeRoot()
		bindings_path := path.Join(root, "apps", "fluster", "src", "core", "lib", "bindings.ts")
		content, err := os.ReadFile(bindings_path)
		if err != nil {
			log.Fatal(err)
		}
		newContent := fmt.Sprintf("/* eslint-disable  */\n// @ts-nocheck comment\n%s", content)
		err = os.WriteFile(bindings_path, []byte(newContent), 0777)
		if err != nil {
			log.Fatal(err)
		}
	},
}

package generate_swift_colors

import (
	"bytes"
	"embed"
	"os"
	"strings"
	"text/template"

	"github.com/charmbracelet/log"
	"github.com/tidwall/gjson"
)

var (
	//go:embed "templates/*"
	templateFiles embed.FS
)

func formatKey(k string) string {
	res := strings.ReplaceAll(k, "-", "_")
	return res
}

type ColorGroup struct {
	Name string
	data gjson.Result
}

func (c ColorGroup) Red() string {
	return c.data.Get("red").String()
}

func (c ColorGroup) Green() string {
	return c.data.Get("green").String()
}
func (c ColorGroup) Blue() string {
	return c.data.Get("blue").String()
}

type ThemeGroup struct {
	data        gjson.Result
	colorKeys   [22]string
	Name        string
	DarkColors  []ColorGroup
	LightColors []ColorGroup
}

func GenerateSwiftColors(output_path string) {
	println("Generating swift colors...")
	inputPath := "/Users/bigsexy/Desktop/fluster/packages/fluster_developer/src/themes_rgb.json"
	inputData, err := os.ReadFile(inputPath)
	if err != nil {
		log.Fatal(err)
	}

	colorKeys := [...]string{
		"background",
		"foreground",
		"card",
		"card-foreground",
		"popover",
		"popover-foreground",
		"primary",
		"primary-foreground",
		"secondary",
		"secondary-foreground",
		"muted",
		"muted-foreground",
		"accent",
		"accent-foreground",
		"destructive",
		"destructive-foreground",
		"border",
		"input",
		"ring",
		"brand",
		"radius",
		"general-link-color",
	}
	themes := []ThemeGroup{}
	jsonData := gjson.ParseBytes(inputData)
	jsonData.ForEach(func(key, value gjson.Result) bool {
		darkColors := []ColorGroup{}
		lightColors := []ColorGroup{}
		value.Get("light").ForEach(func(key, value gjson.Result) bool {
			lightColors = append(lightColors, ColorGroup{
				Name: formatKey(key.String()),
				data: value,
			})
			return true
		})
		value.Get("dark").ForEach(func(key, value gjson.Result) bool {
			darkColors = append(darkColors, ColorGroup{
				Name: formatKey(key.String()),
				data: value,
			})
			return true
		})
		themes = append(themes, ThemeGroup{
			data:        value,
			colorKeys:   colorKeys,
			LightColors: lightColors,
			DarkColors:  darkColors,
			Name:        strings.Title(key.String()),
		})
		return true
	})

	templ, err := template.ParseFS(templateFiles, "templates/**")
	if err != nil {
		log.Fatal(err)
	}
	var buf bytes.Buffer
	err = templ.ExecuteTemplate(&buf, "swift_themeing_template.swift.txt", themes)
	if err != nil {
		log.Fatal(err)
	}
	err = os.WriteFile("/Users/bigsexy/Desktop/swift/Fluster/Fluster/Core/models/themeing/themes.swift", buf.Bytes(), 0777)
	if err != nil {
		log.Fatal(err)
	}

}

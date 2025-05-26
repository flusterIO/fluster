from pathlib import Path
import json

good_file = Path(
    "/Users/bigsexy/Desktop/fluster/packages/fluster_ui/package.json")
bad_file = Path("/Users/bigsexy/Desktop/fluster/apps/fluster/package.json")


good_data = json.loads(good_file.read_text())
bad_data = json.loads(bad_file.read_text())

dep_types = ["dependencies", "devDependencies"]


for t in dep_types:
    for dep in good_data[t]:
        for t2 in dep_types:
            if dep in bad_data[t2]:
                bad_data[t2][dep] = good_data[t][dep]

print(json.dumps(bad_data))

import os
from setuptools import setup, find_packages
import json
from pathlib import Path

root = os.environ["FLUSTER_NATIVE_ROOT"]

if root is None or root == "":
    print(
        "Cannot continue without an FLUSTER_NATIVE_ROOT environment variable set to the root of the workspace."
    )
    exit(1)

p = json.loads((Path(root) / "build_env.json").read_text())

setup(
    name="flusterIo",
    version=p["distributedApiVersion"],
    packages=find_packages(),
    license="MIT",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
)

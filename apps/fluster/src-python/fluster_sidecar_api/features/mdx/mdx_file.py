from dataclasses import dataclass, field
from langchain_community.document_loaders import UnstructuredMarkdownLoader


@dataclass
class MdxFile:
    absolute_path: str

    def get_document(self):
        return UnstructuredMarkdownLoader(self.absolute_path, mode="elements")

from typing import List
from flask_restful.reqparse import RequestParser


def add_ai_temperature_arguments(parser: RequestParser):
    parser.add_argument(
        "model",
        required=True,
        type=str,
        help="The embedding model to use with Ollama.",
    )
    parser.add_argument(
        "temperature",
        required=False,
        type=List[str],
        help="The temperature to use for the embedding model.",
    )
    parser.add_argument(
        "top_k",
        required=False,
        type=int | None,
        help="The top_k to use for the embedding model.",
    )
    parser.add_argument(
        "top_p",
        required=False,
        type=float | None,
        help="The top_p to use for the embedding model.",
    )
    parser.add_argument(
        "ollama_url_override",
        required=False,
        type=int | None,
        help="The ollama connection url to use.",
    )

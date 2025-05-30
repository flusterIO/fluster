import pytest
import fluster_py_internal


def test_sum_as_string():
    assert fluster_py_internal.sum_as_string(1, 1) == "2"

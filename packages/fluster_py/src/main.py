from dataclasses import dataclass


@dataclass
class MyClass:
    """Test doc string here."""

    idx: int


def main():
    print("Hello from fluster-py!")


if __name__ == "__main__":
    main()

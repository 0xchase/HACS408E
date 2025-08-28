#!/usr/bin/env python3

import argparse
import getpass
import sys
from subprocess import PIPE, Popen, TimeoutExpired

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Uploads files in 'public/' to remote server via SFTP."
    )
    _ = parser.add_argument(
        "--user",
        "-u",
        type=str,
        required=True,
        help="Username to use for SSH connection",
    )
    # _ = parser.add_argument(
    #     "--password",
    #     "-p",
    #     type=str,
    #     default="",
    #     help="Password to use for associated user. If omitted you will be prompted.",
    # )
    args = parser.parse_args()

    HOST = "sftp.it-prod-webhosting.aws.umd.edu"
    username: str = args.user  # pyright: ignore[reportAny]
    # password: str = args.password  # pyright: ignore[reportAny]
    # if not password:
    #     password = getpass.getpass(f"({username}@{HOST}) Password: ")

    with Popen(
        ("sftp", f"{username}@{HOST}"),
        stdin=PIPE,
        stdout=PIPE,
        stderr=PIPE,
    ) as proc:
        if proc.stdin is None or proc.stdout is None or proc.stderr is None:
            print("Error with subprocess input/output!")
            sys.exit()

        # _ = proc.stdin.write(f"{password}\n".encode())

        _ = proc.stdin.write(
            "\n".join(
                ("cd hacs408e", "pwd", "lcd public", "lpwd", "put -fpR . .", "bye")
            ).encode()
        )

        while proc.poll() is None:
            print("Attempting to get data...")
            if data := proc.stdout.read1():
                _ = sys.stdout.buffer.write(data)
                _ = sys.stdout.buffer.flush()

        try:
            out, err = proc.communicate(timeout=5)
        except TimeoutExpired:
            proc.kill()
            out, err = proc.communicate()

        _ = sys.stdout.buffer.write(out)
        _ = sys.stderr.buffer.write(err)

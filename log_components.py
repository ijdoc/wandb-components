import wandb
import os

def main():
    # Initialize a new run
    with wandb.init(
        config={"components": ["qa-bot", "clone-run"]},
        job_type="log-components",
        project="components",
    ) as run:
        # Get this script's directory
        script_dir = os.path.dirname(os.path.realpath(__file__))
        for component in run.config["components"]:
            # Build component path
            component_path = os.path.join(script_dir, component)
            # Build component and print output
            os.system(f"cd {component_path} && npm run build")
            # Log component
            wandb.log(
                {
                    component: wandb.Html(
                        open(f"./{component}/dist/index.html"), inject=False
                    )
                }
            )

if __name__ == "__main__":
    main()
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
// import { Button } from "./ui/button"
import { handleImageUpload } from "@/actions/image.action"

export const FileUpload = () => {

    return (
        <form onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            await handleImageUpload(formData);
        }}>
            <Label htmlFor="picture">Upload the thumbnail</Label>
            <Input id="image" name="image" type="file" />
            <Button type="submit">Submit</Button>
        </form>
    )
}
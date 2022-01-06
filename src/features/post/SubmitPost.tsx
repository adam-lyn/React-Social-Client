import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import swal from 'sweetalert';
import { formatYT } from "../../util/youtubeFunctions";

// This function checks the embedURL and returns the appropriate contentType
function checkEmbed(embedURL: string) {
    // Check first that it's a URL by performing a split
    let urlMap = embedURL.split(".");
    
    // If it's a proper url, it should have at least 2 values here. 
    if (urlMap.length >= 2){
        // Checks if there's a valid file type extension at the end
        const regExp = /.*\.(jpg|JPG|gif|GIF|jpeg|fjif|pjp|gifv|gif|png)/g;
        const match = embedURL.match(regExp);
        console.log(match);

        // If it's a valid file type, we just return that it's an img
        if (match){
            return "IMG";
        }
        else {
            try {
                // Use our function to get the video code from the entire URL
                let vCode = formatYT(embedURL);
                
                // If the videocode isn't null, then it's a valid
                if (vCode != null) return "VID";
                else return null;
            }
            catch {
                return null;
            }
        }
    }
    else {
        return null;
    }
    
}



function SubmitPost(props: any) {

    const closeSubmit = () => {
        if (props.post.postText != "") {
            let cType = checkEmbed(props.post.contentLink);

            if (cType == 'IMG') {
                const regExp = /.*\.(jpg|JPG|gif|GIF|jpeg|fjif|pjp|gifv|gif|png)/g;
                props.post.contentLink = props.post.contentLink.match(regExp)[0];
            }

            props.post.contentType = cType;

            if (props.post.contentLink && props.post.contentType == null){
                swal("Invalid content link!", "Make sure images end with a proper format type or that videos are youtube links.", "error");
            }
            else{
                props.onHide();
                props.dispatchPost();
            }

        } else {
            swal("Missing body!", "Posts must have a body.", "error");
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="createPostModal"
        >
            <Modal.Header closeButton >
                <Modal.Title>
                    New Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Picture Input */}
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={11}>
                            {/* Next line sets the text that sits in the input. Line after sets the imageURL*/}
                            <Form.Control
                                placeholder="Image or Video Embed URL"
                                onChange={(event) => {
                                    props.setPost({ ...props.post, contentLink: event.target.value })} 
                                }/>
                        </Col>
                    </Form.Group>

                    {/* Text Input */}
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={12}>
                            <Form.Control
                                as="textarea"
                                placeholder="Post"
                                style={{ height: "100px"}}
                                maxLength={1000}
                                onChange={(event) => {
                                    props.setPost({ ...props.post, postText: event.target.value })
                                    
                                }
                            }
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* Submit Button */}
                <Button data-testid="submitPostButton" id="submitPostBtn" type="button" onClick={() => closeSubmit()}>Post to Reverb</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SubmitPost;
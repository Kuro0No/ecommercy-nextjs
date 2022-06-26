import React, { useEffect, useState } from 'react'
import { Comment, Avatar, Button, Row, Col, Space } from 'antd';
import css from '../styles/Comments.module.scss'
import { Input } from 'antd';
import axiosConfig from '../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getRepComments } from '../redux/commentsReducer';
import moment from 'moment';


const { TextArea } = Input;

const RepComments = ({ comment_id }) => {
    const { repComments } = useSelector(state => state.comments)
    const dispath = useDispatch()


    useEffect(() => {
        dispath(getRepComments(comment_id))
    }, [])



    return <>
        {repComments.map(rep =>
            <Comment

                key={rep.id}
                actions={[
                    <div className={css['actions-container']}>
                        <span key="comment-list-reply-to-0">Reply </span>
                        {/* {user && <span onClick={() => handleDeleteRepCmt(rep.id)}>{user.user_id === rep.user.id && 'Delete cmt'}</span>} */}

                    </div>
                ]}
                author={<strong>{rep.user.name}</strong>}
                avatar={<Avatar src='https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg' alt='1' />}
                content={<p>{rep.content}</p>}
                datetime={<span className={css.time}>{moment(rep.created).fromNow()}</span>}
            />
        )}
    </>
    // {openRepCmt === comment_id &&
    //     <>
    //         <TextArea
    //             value={repCmtContent}
    //             // onPressEnter={() => handleSubmitRepCmt(comment_id)}
    //             onChange={(e) => setRepCmtContent(e.target.value)}
    //             placeholder="Write a reply..."
    //             autoSize={{ minRows: 2, maxRows: 5 }}
    //         />
    //         {/* <Button onClick={() => handleSubmitRepCmt(comment_id)} className='my-2' shape='round' type='primary'>Send</Button> */}
    //     </>
    // }

}


const Comments = ({ product_id }) => {
    const [openRep, setOpenRep] = useState(false)
    const dispath = useDispatch()
    const { comments } = useSelector(state => state.comments)
    useEffect(() => {
        dispath(getComments(product_id))
        setOpenRep(false)
    }, [])
    const handleRep = (item) => {
        dispath(getRepComments(item))
        setOpenRep(true)
    }

    return (
        <div className={css['comments-container']}>
            <Row>
                <Col xs={12}>

                    <TextArea
                        placeholder="Autosize height with minimum and maximum number of lines"
                        autoSize={{ minRows: 2, maxRows: 5 }}
                    />

                    <Button style={{ marginTop: 10 }} type="primary" shape="round" > Send </Button>

                </Col>
                <Col style={{ marginTop: 50 }} xs={24}>
                    {comments.map((item, i) => {


                        return <Comment
                            key={item.id}
                            actions={[
                                <div className={css['actions-container']}>
                                    {item.count_rep_comments > 0 && <span >{item.count_rep_comments} {item.count_rep_comments > 1 ? 'replies' : 'reply'}</span>}
                                    <span onClick={() => handleRep(item.id)} key="comment-list-reply-to-0">Reply </span>
                                    {/* {user && <span onClick={() => handleDeleteCmt(item.id)}>{user.user_id === item.user.id && 'Delete cmt'}</span>} */}
                                </div>
                            ]}
                            author={<strong>{item.user.name}</strong>}
                            avatar={<Avatar src='https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg' alt='1' />}
                            content={<p>
                                {item.content}
                            </p>
                            }
                            datetime={<>
                                <span className={css.time}>{moment(item?.created).fromNow()}</span>
                            </>
                            }
                        >
                            {openRep && <RepComments comment_id={item.id} />}

                        </Comment>
                    })
                    }
                </Col>
            </Row>

        </div>
    )
}

export default Comments
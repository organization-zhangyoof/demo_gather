import React, { Component } from 'react'
import { Upload, Button, Icon, Modal } from 'antd';
let FS = require('fs')
class Page5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            url: ''
        }
    }

    render() {
        const { degrees, PDFDocument, rgb, StandardFonts } = window.PDFLib
        const { visible, url } = this.state
        const base64ToFile = (dataurl, filename)=> {
            let arr = dataurl.split(","),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
          }

        const uint8arrayToBase64 = (u8Arr) => {
            let CHUNK_SIZE = 0x8000; //arbitrary number
            let index = 0;
            let length = u8Arr.length;
            let result = '';
            let slice;
            while (index < length) {
                slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
                result += String.fromCharCode.apply(null, slice);
                index += CHUNK_SIZE;
            }
            // web image base64图片格式: "data:image/png;base64," + b64encoded;
            // return  "data:image/png;base64," + btoa(result);
            // return btoa(result);
            let base64 = window.btoa(result);
            console.log("base64---",base64)
            // let file = base64ToFile(base64,'转换文件')
            // return file
        }
        const arrayBufferToBase64 = (array) => {
            // array = new Uint8Array(array);
            var length = array.byteLength;
            var table = ['A','B','C','D','E','F','G','H',
                         'I','J','K','L','M','N','O','P',
                         'Q','R','S','T','U','V','W','X',
                         'Y','Z','a','b','c','d','e','f',
                         'g','h','i','j','k','l','m','n',
                         'o','p','q','r','s','t','u','v',
                         'w','x','y','z','0','1','2','3',
                         '4','5','6','7','8','9','+','/'];
            var base64Str = '';
            for(var i = 0; length - i >= 3; i += 3) {
                var num1 = array[i];
                var num2 = array[i + 1];
                var num3 = array[i + 2];
                base64Str += table[num1 >>> 2]
                    + table[((num1 & 0b11) << 4) | (num2 >>> 4)]
                    + table[((num2 & 0b1111) << 2) | (num3 >>> 6)]
                    + table[num3 & 0b111111];
            }
            var lastByte = length - i;
            if(lastByte === 1) {
                var lastNum1 = array[i];
                base64Str += table[lastNum1 >>> 2] + table[((lastNum1 & 0b11) << 4)] + '==';
            } else if(lastByte === 2){
                var lastNum1 = array[i];
                var lastNum2 = array[i + 1];
                base64Str += table[lastNum1 >>> 2]
                    + table[((lastNum1 & 0b11) << 4) | (lastNum2 >>> 4)]
                    + table[(lastNum2 & 0b1111) << 2]
                    + '=';
            }
            // return base64Str;
            let newFile = base64ToFile(base64Str,"转换文件")
            return newFile
        }
        const modifyPdf = async (file) => {
            // Fetch an existing PDF document
            const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
            const existingPdfBytes = await fetch(file).then(res => res.arrayBuffer())
            console.log('existingPdfBytes----',existingPdfBytes)
            // Load a PDFDocument from the existing PDF bytes
            const pdfDoc = await PDFDocument.load(existingPdfBytes)
            // let pdfDoc = ''
            // let fileName = ''
            // fileToBuf(file,(buf,name)=>{
            //     pdfDoc  = buf
            //     fileName = name
            // })
            console.log('pdfDoc----',pdfDoc)
            // console.log('fileName----',fileName)
            // Embed the Helvetica font
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

            // Get the first page of the document
            const pages = pdfDoc.getPages()
            console.log("pages-----",pages)
            const firstPage = pages[0]
            for (let index = 0; index < pages.length; index++) {
                const ele = pages[index];
                // Get the width and height of the first page
                const { width, height } = ele.getSize()
                console.log('height----',height)

                // Draw a string of text diagonally across the first page
                ele.drawText('This text was added with JavaScript jshfdjshafkjhdskjafhjkd fsakfdsahfasfksaklfdjs fjskjfdlksajflkjsalkfjsal fjskljfdklsajflasjfdlkasj!', {
                    x: 5,
                    // y: height / 2 + 300,
                    y: height,
                    size: 50,
                    font: helveticaFont,
                    color: rgb(0.95, 0.1, 0.1),
                    rotate: degrees(-90),
                })
            }

            

            // Serialize the PDFDocument to bytes (a Uint8Array)
            // const pdfBytes = await pdfDoc.save()
            const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true })
            debugger
            console.log('pdfBytes---',pdfBytes)
            let newFile = base64ToFile(pdfBytes,"asdsa")
            // let newFile = uint8arrayToBase64(pdfBytes)
            // let newFile = arrayBufferToBase64(pdfBytes)
            this.setState({url: window.URL.createObjectURL(newFile)})
            // Trigger the browser to download the PDF document
            // window.download(pdfBytes, "pdf-lib1.pdf", "application/pdf");
        }
        const uploadProps = {
            beforeUpload: file => {
                modifyPdf(window.URL.createObjectURL(file))
                this.setState(state => ({
                    //   fileList: [...state.fileList, file],
                    url: window.URL.createObjectURL(file),
                    visible: true
                }));
                return false;
            },
        }
        const modalProps = {
            centered: true,
            width: 1100,
            visible: visible,
            onCancel: () => {
                this.setState({ visible: false })
            }
        }
        return (
            <div style={{ width: '100%', height: '100%', background: '#C1F5E8' }}>
                <Upload {...uploadProps}>
                    <Button>
                        <Icon type="upload" /> 选择文件
                    </Button>
                </Upload>
                <Modal {...modalProps}>
                    <div style={{ width: 1000, height: 800, background: 'red' }}>
                        <iframe style={{ width: '100%', height: '100%' }} src={url}></iframe>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Page5;

// Based on  https://codepen.io/diguifi/pen/YdBbyz
var canvasElement = document.getElementById("canvas");
var pay_url = `./../module/payment/handler`;
var bill_url = `./../module/bill/handler`;

let fname = $("input[name='fname']").val();
let hospital_name = $("#hospital_name").val();
let pa_id = $("#pa_id").val();
let today_date = moment().format("MMM Do YY");

let bill_data = {}; let pay_total = 0;
payment_details = () => {
$.post(bill_url, { 
swtch : "get_total_data", 
p_id : pa_id
}, function(data, status){ 
bill_data = data.Bill_data;
      data.Pay_data.map((e) => {
	  pay_total += e.amount;
	  });
});
} 
payment_details();

// change base 64
getBase64ImageFromURL = (url) => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = error => {
      reject(error);
    };

    img.src = url;
  });
}

// Table creating function

var fsz = 10;
write_table = () => {	
var json_table = [];


				var f_color = 'black';
				//var ft_color = '#256D85';
				var ft_color = f_color;
				var text_g = "green"; var text_r = "red";
				var th = 'tableHeader';
				var pdf_data = [];
				var th = 'tableHeader';
				let header_details = [{text: 'S.no', style: th, fontSize: fsz, alignment: 'center', bold: true, color:f_color }, 
				{text: 'Description', style: th, fontSize: fsz, alignment: 'left', bold: true, color:f_color}, 
				{text: 'amount', style: th, fontSize: fsz, alignment: 'right', bold: true, color:f_color
				}];
				pdf_data[0] = header_details;
		let total = 0; 
		for (i=0; i < bill_data.length; i++) {
		total += bill_data[i].amount;
		pdf_data[i+1] =  [
		{ text: i+1 ,  border: [true, true, true, true], fontSize: fsz, alignment: 'center', color:f_color },
		{ text: bill_data[i].name ,  border: [true, true, true, true], fontSize: fsz, alignment: 'left', color:f_color },
		{ text: bill_data[i].amount ,  border: [true, true, true, true], fontSize: fsz, alignment: 'right', color:f_color },
		]
		}
		
		let empty_space = [
		{ text: "" ,  border: [false, false, false, false], fontSize: fsz, alignment: 'center', color:f_color },
		{ text: "" ,  border: [false, false, false, false], fontSize: fsz, alignment: 'center', color:f_color },
		{ text: "" , border: [false, false, false, false], fontSize: fsz, alignment: 'center', color:f_color },
		];
		
		// Empty Space
		pdf_data[i+1] =  empty_space;
		
		// Sub Total
		pdf_data[i+2] =  [
		{ text: "" ,  bold:true , border: [false, false, false, false], fontSize: fsz, alignment: 'center', color:ft_color },
		{ text: "Sub Total" , bold:true ,border: [false, false, false, true], fontSize: fsz, alignment: 'left', color:ft_color },
		{ text: total , bold:true ,border: [false, false, false, true], fontSize: fsz, alignment: 'right', color:ft_color },
		];
		pdf_data[i+1] =  empty_space;
		// Addvance Ammount
		pdf_data[i+3] =  [
		{ text: "" ,  bold:true ,border: [false, false, false, false], fontSize: fsz, alignment: 'center', color:ft_color },
		{ text: "Paid Amount" , bold:true ,border: [false, false, false, false], fontSize: fsz, alignment: 'left', color:ft_color },
		{ text: pay_total , bold:true ,border: [false, false, false, false], fontSize: fsz, alignment: 'right', color:ft_color },
		];pdf_data[i+1] =  empty_space;
		
		// Final Total Ammount
		pdf_data[i+4] =  [
		{ text: "" ,  bold:true ,border: [false, false, false, true], fontSize: fsz, fillColor:"lightgray",alignment: 'center', color:ft_color },
		{ text: total-pay_total?"Balance Due":"Extra Amount" ,  bold:true ,border: [false, false, false, true], fontSize: fsz, fillColor:"lightgray",alignment: 'left', color:ft_color },
		{ text: total-pay_total , bold:true ,border: [false, false, false, true], fontSize: fsz, fillColor:"lightgray",alignment: 'right', color:total-pay_total?text_r:text_g },
		]		
		
        json_table.push({
        style: 'tableExample',
        layout: { // 34567
        fillColor: function (rowIndex, node, columnIndex) {
        return (rowIndex === 0 ) ? '#F3F1F5' : null;
        },
				hLineColor: function (i, node) {
				return (i === 0 || i === node.table.body.length) ? '#BFA2DB' : '#F0D9FF';
				},
				vLineColor: function (i, node) {
				return (i === 0 || i === node.table.widths.length) ? '#BFA2DB' : '#7F7C82';
				}
					//,hLineStyle: function (i, node) { return {dash: {length: 10, space: 4}}; },
					//vLineStyle: function (i, node) { return {dash: {length: 4}}; }		
        },
        table: {
		widths: ['10%','60%','30%'],
        headerRows: 1,
        body: pdf_data
        }		
		
        });		
		return json_table
}


// Pdf creating function

async function render_Data(){
let pdf_border_color = "#8BBCCC";
let pdf_color = "#9C9EFE";
return dd = {
		color:"9C9EFE",
	    background: function (currentPage, pageSize) {
        return [
            {
                canvas: [
                    { type: 'line', x1: 5, y1: 5, x2: 590, y2: 5, lineWidth: 1, hLineColor:pdf_border_color }, //Up line
                    { type: 'line', x1: 5, y1: 5, x2: 5, y2: 835, lineWidth: 1, hLineColor:pdf_border_color }, //Left line
                    { type: 'line', x1: 5, y1: 835, x2: 590, y2: 835, lineWidth: 1, hLineColor:pdf_border_color }, //Bottom line
                    { type: 'line', x1: 590, y1: 5, x2: 590, y2: 835, lineWidth: 1, hLineColor:pdf_border_color }, //Rigth line
                ]

            }
        ]
    },

	content: [
	    // Header
	    {
	        columns: [
	            {
                    //image: 'data:image/png;base64,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',
					image: await getBase64ImageFromURL('../../images/logo.png'),
                    width: 150
	            },
	                
	            [
	                {
	                    text: 'INVOICE', 
	                    style: 'invoiceTitle',
	                    width: '*'
	                },
    	            {
    	              stack: [
    	                   {
    	                       columns: [
    	                            {
    	                                text:'Invoice #', 
    	                                style:'invoiceSubTitle',
    	                                width: '*'
    	                                
    	                            }, 
    	                            {
    	                                text:'00001',
    	                                style:'invoiceSubValue',
    	                                width: 100
    	                                
    	                            }
    	                            ]
    	                   },

    	                   {
    	                       columns: [
    	                           {
    	                               text:'Date Issued',
    	                               style:'invoiceSubTitle',
    	                               width: '*'
    	                           }, 
    	                           {
    	                               text: today_date,
    	                               style:'invoiceSubValue',
    	                               width: 100
    	                           }
    	                           ]
    	                   },
    	               ]
    	            }
	            ],
	        ],
	    },
	    
		// Billing Headers
	    {
	        columns: [
	            {
	                text: hospital_name,
	                style:'invoiceBillingAddressTitle',
	                
	            },
	            {
	                text: 'Paitent Details',
	                style:'invoiceBillingAddressTitle',
	                
	            },
	        ]
	    },
	    // Billing Details
	    {
	        columns: [
	            {
	                text: $("#staff_name").val(),
	                style: 'invoiceBillingDetails'
	            },
	            {
	                text:  $("input[name='fname']").val()+" "+$("input[name='lname']").val(),
	                style: "invoiceBillingAddress"
	            },
	        ]
	    },
	    // Billing Address Title
	    {
	        columns: [
	            {
	                text: 'Address',
	                style: 'invoiceBillingAddressTitle'
	            },
	            {
	                text: 'Address',
	                style: 'invoiceBillingAddressTitle'
	            },
	        ]
	    },
	    // Billing Address
	    {
	        columns: [
	            {
	                text: '9999 Street name 1A \n New-York City NY 00000 \n   USA',
	                style: 'invoiceBillingAddress'
	            },
	            {
	                text: $("input[name='city']").val()+" \n "+$("input[name='state']").val()+" - "+$("input[name='pincode']").val(),
	                style: 'invoiceBillingAddress'
	            },
	        ]
	    },
        // Line breaks
	    '\n\n',
	    // Items Table
        write_table(),
		
		// Signature
		
		{
	        columns: [
	            {
	                text:'',
	            },
	            {
	                stack: [
	                    { 
	                        text: '_________________________________',
	                        style:'signaturePlaceholder'
	                    },
	                    { 
	                        text: $("#staff_name").val(),
	                        style:'signatureName'
	                        
	                    },
	                    { 
	                        text: $("#staff_role").val(),
	                        style:'signatureJobTitle'
	                        
	                    }
	                    ],
	               width: 180
	            },
	        ]
	    },
		/*
        { 
            text: 'NOTES',
            style:'notesTitle'
        },
        { 
            text: 'Some notes goes here \n Notes second line',
            style:'notesText'
        }
		*/
	],
	
	styles: {
	    // Document Header
	    documentHeaderLeft: {
	        fontSize: fsz,
	        margin: [5,5,5,5],
	        alignment:'left'
	    },
	    documentHeaderCenter: {
	        fontSize: fsz,
	        margin: [5,5,5,5],
	        alignment:'center'
	    },
	    documentHeaderRight: {
	        fontSize: fsz,
	        margin: [5,5,5,5],
	        alignment:'right'
	    },
	    // Document Footer
	    documentFooterLeft: {
	        fontSize: fsz,
	        margin: [5,5,5,5],
	        alignment:'left'
	    },
	    documentFooterCenter: {
	        fontSize: fsz,
	        margin: [5,5,5,5],
	        alignment:'center'
	    },
	    documentFooterRight: {
	        fontSize: fsz,
	        margin: [5,5,5,5],
	        alignment:'right'
	    },
	    // Invoice Title
		invoiceTitle: {
			fontSize: 22,
			bold: true,
			alignment:'right',
			margin:[0,0,0,15]
		},
		// Invoice Details
		invoiceSubTitle: {
			//fontSize: fsz+2,
			fontSize: fsz,
			alignment:'right'
		},
		invoiceSubValue: {
			//fontSize: fsz+2,
			fontSize: fsz,
			alignment:'right'
		},
		// Billing Headers
		invoiceBillingTitle: {
			//fontSize: fsz+4,
			fontSize: fsz,
			bold: true,
			alignment:'left',
			margin:[0,20,0,5],
		},
		// Billing Details
		invoiceBillingDetails: {
			alignment:'left'

		},
		invoiceBillingAddressTitle: {
		    margin: [0,7,0,3],
		    bold: true
		},
		invoiceBillingAddress: {
		    
		},
		// Items Header
		itemsHeader: {
		    margin: [0,5,0,5],
		    bold: true
		},
		// Item Title
		itemTitle: {
		    bold: true,
		},
		itemSubTitle: {
            italics: true,
            //fontSize: fsz+1
			fontSize: fsz
		},
		itemNumber: {
		    margin: [0,5,0,5],
		    alignment: 'center',
		},
		itemTotal: {
		    margin: [0,5,0,5],
		    bold: true,
		    alignment: 'center',
		},

		// Items Footer (Subtotal, Total, Tax, etc)
		itemsFooterSubTitle: {
		    margin: [0,5,0,5],
		    bold: true,
		    alignment:'right',
		},
		itemsFooterSubValue: {
		    margin: [0,5,0,5],
		    bold: true,
		    alignment:'center',
		},
		itemsFooterTotalTitle: {
		    margin: [0,5,0,5],
		    bold: true,
		    alignment:'right',
		},
		itemsFooterTotalValue: {
		    margin: [0,5,0,5],
		    bold: true,
		    alignment:'center',
		},
		signaturePlaceholder: {
		    margin: [0,70,0,0],   
		},
		signatureName: {
		    bold: true,
		    alignment:'center',
		},
		signatureJobTitle: {
		    italics: true,
		    fontSize: fsz,
		    alignment:'center',
		},
		notesTitle: {
		  fontSize: fsz,
		  bold: true,  
		  margin: [0,50,0,3],
		},
		notesText: {
		  fontSize: fsz
		},
		center: {
		    alignment:'center',
		},
	},
	defaultStyle: {
		columnGap: 20,
	}
}

}


async function render() {
	let docdef = await render_Data();
    pdfMake.createPdf(docdef).getDataUrl(function(dataURL) {
        renderPDF(dataURL, document.getElementById("canvas"));
    });
}
async function pdf_download(doc_title) {
	let docdef = await render_Data();
    var pdf = createPdf(docdef);
    pdf.download(doc_title+"_Bill.pdf");
}

// * this is not important for PDFMake, it's here just to render the result *
// It's a Mozilla lib called PDFjs that handles pdf rendering
function renderPDF(url, canvasContainer, options) {
    options = options || { scale: 1.4 };

    function renderPage(page) {
        var viewport = page.getViewport(options.scale);
        var wrapper = document.createElement("div");
        wrapper.className = "canvas-wrapper";
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        wrapper.appendChild(canvas);
        canvasContainer.appendChild(wrapper);

        page.render(renderContext);
    }

    function renderPages(pdfDoc) {
        for (var num = 1; num <= pdfDoc.numPages; num++)
            pdfDoc.getPage(num).then(renderPage);
    }

    PDFJS.disableWorker = true;
    PDFJS.getDocument(url).then(renderPages);
}
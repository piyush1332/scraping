function dataScraping()
{
	var targated_site_data = document.getElementById('targated_site_html').innerHTML;

	var targated_data_container = document.createElement('div');
	targated_data_container.innerHTML = targated_site_data;

	var table_title = targated_data_container.getElementsByClassName('block block-core block-page-title-block no-title')[0].innerText;
	mainTitleCreation(table_title);

	var last_updated = targated_data_container.getElementsByClassName('views-field views-field-nothing-1')[0].innerText;
	lastUpdateCreation(last_updated);

	var main_data_childrens = targated_data_container.getElementsByClassName('views-field views-field-nothing-1')[0].nextElementSibling.children[0].children;
	var main_data_array = [];
	for(var i = 0; i <= main_data_childrens.length-1; i++)
	{
		if(main_data_childrens[i].tagName != 'BR' && main_data_childrens[i].tagName != 'P')
		{
			if(main_data_childrens[i].innerText.split(':')[1] != '')
			{
				var row_title = main_data_childrens[i].innerText.split(':')[0]; 
				var row_detail_array = [main_data_childrens[i].innerText.split(':')[1]]; 
			}
			else
			{
				var row_title = main_data_childrens[i].innerText.split(':')[0];
				var row_detail_array = [];
				for(var j = i+1; j <= main_data_childrens.length-1; j++)
				{
					if(main_data_childrens[j].tagName == 'P')
					{
						row_detail_array.push(main_data_childrens[j].innerText);
					}
					if(main_data_childrens[j].tagName == 'SPAN')
					{
						break;
					}
				}
			}
			var temp_obj = {
				'row_title': row_title,
				'row_detail' : row_detail_array
			}
			main_data_array.push(temp_obj);
		}
	}
	mainDataCreation(main_data_array);

	// scraping table data
	var table_parent = targated_data_container.getElementsByClassName('views-field views-field-nothing-1')[0].nextElementSibling.nextElementSibling;
	var table_row_array = table_parent.getElementsByTagName('tr');
	var table_row_data = [];
	for(var i = 0; i <= table_row_array.length-1; i++)
	{
		var table_cell_array = table_row_array[i].children;
		var table_cell_data = [];
		for(var j = 0; j <= table_cell_array.length-1; j++)
		{
			if(table_cell_array[j].tagName == 'TD' && j == 1)
			{
				table_cell_data.push(table_cell_array[j].getElementsByTagName('a')[0].href);
			}
			else
			{
				if(table_cell_array[j].tagName == 'TD' && j == 2)
				{
					table_cell_data.push('Image');
				}
				else
				{
					table_cell_data.push(table_cell_array[j].innerText);
				}
			}
		}
		table_row_data.push(table_cell_data);
	}
	tableDataDisplay(table_row_data);
}
dataScraping();

function mainTitleCreation(table_title)
{
	var main_title = document.createElement('div');
	main_title.style.fontSize = "20pt";
	main_title.style.fontFamily = 'sans-serif';
	main_title.style.borderBottom =  '1px solid #ecebeb';
	main_title.style.padding = "1rem";
	main_title.style.width = "570px";
	main_title.innerText = table_title;
	document.body.appendChild(main_title);
}

function lastUpdateCreation(last_updated)
{
	var last_update = document.createElement('div');
	last_update.innerText = last_updated;
	last_update.style.cssText = "padding: 10px; margin-left: 7px; font-size: 12pt; font-family: sans-serif ; color: gray;";
	document.body.appendChild(last_update);
}

function mainDataCreation(main_data_array)
{
	var body_content = document.createElement('div');
	var main_body_data = "";
	for(var i = 0; i<= main_data_array.length-1; i++){
		main_body_data += '<div><h4>' + main_data_array[i].row_title + '</h4><p style="font-size: 11pt;line-height: 0px; padding: 10px;">' + main_data_array[i].row_detail + '</p></div>';
	}
	body_content.innerHTML = main_body_data;
	body_content.style.cssText = "padding-left: 1rem; font-family: sans-serif; color: gray;";
    document.body.appendChild(body_content);
}

function tableDataDisplay(table_row_data)
{
	var body_content = document.createElement('div');
	var main_table_body_data = "<table style='width: 923px; text-align: left;'>";
	main_table_body_data += '<tr style="background: #403e3e;">';
	for(var j = 0; j<=table_row_data[0].length-1; j++ )
	{
		main_table_body_data += '<th style="padding: 1rem; color: white;">' + table_row_data[0][j] + '</th>';
	}
	main_table_body_data += '</tr>';
	for(var k = 1; k <= table_row_data.length - 1; k++)
	{
		main_table_body_data += '<tr>';
		for(var i = 0; i<= table_row_data[k].length-1; i++)
		{
			main_table_body_data += '<td style="padding-top: 1rem; padding-bottom: 1rem;">' + table_row_data[k][i] + '</td>';
		}
		main_table_body_data += '<tr>';
	}
	main_table_body_data += '</table>';
	body_content.innerHTML = main_table_body_data;
	document.body.appendChild(body_content);
}
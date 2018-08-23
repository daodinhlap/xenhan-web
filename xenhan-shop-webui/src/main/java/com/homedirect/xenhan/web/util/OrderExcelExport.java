/***************************************************************************
 * Copyright 2016 by HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.web.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.OrderHistory;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.user.model.request.PageOrderRequest;
import com.homedirect.xenhan.web.connection.ApiExchangeService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.List;

@Component
public class OrderExcelExport {
    private Logger logger = LoggerFactory.getLogger(getClass());
    private List<OrderEntity> orders;
    private XSSFWorkbook workbook;
    private HttpServletRequest httpRequest;
    private SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM HH:mm");

    private @Autowired ApiExchangeService apiExchangeService;

    private String[] HEADER = {"STT", "MVĐ","Người tạo", "Ngày tạo", "Ngày kết thúc", "Tên Khách nhận hàng", "SĐT nhận hàng",
            "Địa chỉ giao hàng", "Quận/Huyện giao hàng", "Tỉnh/TP giao hàng", "Tiền hàng", "Phí ship", "Ghi chú", "Trạng thái", "Ghi chú Hủy/Trả"};

    public void export(HttpServletRequest httpRequest, HttpServletResponse response, List<OrderEntity> orders) throws Exception {
        try {
            logger.info("orders size = {}", orders.size());
            if (CollectionUtils.isEmpty(orders)) {
                response.flushBuffer();
                return;
            }
            this.orders = orders;
            this.workbook = new XSSFWorkbook();
            this.httpRequest = httpRequest;

            XSSFSheet sheet = workbook.createSheet("DanhSachDonHang");
            this.columnWidthSettings(sheet);
            this.createDataContent(sheet, 0);

            OutputStream out = response.getOutputStream();
            workbook.write(out);
            out.close();
            logger.info("=====> Done export");

        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
    }

    private void columnWidthSettings(XSSFSheet sheet) {
        for (int i = 2; i < 30; i++) {
            sheet.setColumnWidth(i, 6000);
        }
    }

    private void createDataContent(XSSFSheet sheet, int startRow) {
        createTableContentHeader(sheet, startRow);
        for (int i = 0; i < orders.size(); i++) {
            OrderEntity order = orders.get(i);
            int rowIndex = startRow + 1 + i;
            Row row = sheet.createRow(rowIndex);
            createOrderRowData(row, order, i + 1);
        }
    }

    private void createTableContentHeader(XSSFSheet sheet, int startRow) {
        CellStyle thStyle = thTableStyle(workbook);
        Row headerRow = sheet.createRow(startRow);
        for (int i = 0; i < HEADER.length; i++) {
            createCell(headerRow, i, HEADER[i], thStyle);
        }
    }

    private void createOrderRowData(Row row, OrderEntity order, int index) {
        CellStyle tdCenterStyle = tdCenterTableStyle(workbook);
        CellStyle tdLeftStyle = tdLeftTableStyle(workbook);
        CellStyle tdRightStyle = tdRightTableStyle(workbook);

        createCell(row, 0, index, tdCenterStyle);
        createCell(row, 1, order.getId(), tdCenterStyle);
        createCell(row, 2, order.getAuthor().getFullName() + "\n" + order.getAuthor().getPhone(), tdLeftStyle);
        createCell(row, 3, dateFormat.format(order.getCreatedDate()), tdLeftStyle);

        if (order.getStatus() == OrderConfig.STATUS_200 || order.getStatus() == OrderConfig.STATUS_400 || order.getStatus() == OrderConfig.STATUS_500) {
            createCell(row, 4, dateFormat.format(order.getClosedDate()), tdLeftStyle);
        } else {
            createCell(row, 4, "", tdLeftStyle);
        }


        String dropoffCustomerName = "";
        String dropoffCustomerPhone = "";
        String dropoffAddress = "";
        String dropoffDistrict = "";
        String dropoffTown = "";
        if (order.getDropoff() != null) {
            dropoffCustomerName = order.getDropoff().getContact().getName() == null ? "" : order.getDropoff().getContact().getName();
            dropoffCustomerPhone = order.getDropoff().getContact().getPhone() == null ? "" : order.getDropoff().getContact().getPhone();
            dropoffAddress = order.getDropoff().getAddress() == null ? "" : order.getDropoff().getAddress();
            dropoffDistrict = order.getDropoff().getTown() == null ? "" : order.getDropoff().getTown().getDistrict().getName();
            dropoffTown = order.getDropoff().getTown() == null ? "" : order.getDropoff().getTown().getName();
        }
        createCell(row, 5, dropoffCustomerName, tdLeftStyle);
        createCell(row, 6, dropoffCustomerPhone, tdLeftStyle);
        createCell(row, 7, dropoffAddress, tdLeftStyle);
        createCell(row, 8, dropoffDistrict, tdLeftStyle);
        createCell(row, 9, dropoffTown, tdLeftStyle);
        createCell(row, 10, order.getGoodAmount(), tdRightStyle);
        createCell(row, 11, order.getShipAmount(), tdRightStyle);
        createCell(row, 12, order.getOrderMessage() == null ? "" : order.getOrderMessage(), tdLeftStyle);
        createCell(row, 13, OrderConfig.getOrderStatusDetailString(order.getStatus()), tdLeftStyle);
        createCell(row, 14, getCauseOfReturnOrCancelOrder(order), tdLeftStyle);
    }


    private void createCell(Row row, int position, String value, CellStyle cellStyle) {
        Cell cell = row.createCell(position);
        cell.setCellStyle(cellStyle);
        cell.setCellValue(value);
    }

    public static void createCell(Row row, int position, double value, CellStyle cellStyle) {
        Cell cell = row.createCell(position);
        cell.setCellStyle(cellStyle);
        cell.setCellValue(value);
    }

    public static CellStyle tdCenterTableStyle(XSSFWorkbook workbook) {
        CellStyle style = normalStyle(workbook);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }

    public static CellStyle tdLeftTableStyle(XSSFWorkbook workbook) {
        CellStyle style = normalStyle(workbook);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setAlignment(HorizontalAlignment.LEFT);
        return style;
    }

    public static CellStyle tdRightTableStyle(XSSFWorkbook workbook) {
        CellStyle style = normalStyle(workbook);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setAlignment(HorizontalAlignment.RIGHT);
        return style;
    }

    public static CellStyle normalStyle(XSSFWorkbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style = workbook.createCellStyle();
        style.setFont(normal(workbook, 14));
        style.setWrapText(true);
        return style;
    }

    public static Font normal(XSSFWorkbook workbook, int size) {
        Font font = workbook.createFont();
        font.setFontHeightInPoints((short) size);
        font.setFontName("Times New Roman");
        return font;
    }

    public static CellStyle boldStyle(XSSFWorkbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style = workbook.createCellStyle();
        style.setFont(bold(workbook, 14));
        style.setWrapText(true);
        return style;
    }

    public static Font bold(XSSFWorkbook workbook, int size) {
        Font font = workbook.createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) size);
        font.setFontName("Times New Roman");
        return font;
    }

    public static CellStyle thTableStyle(XSSFWorkbook workbook) {
        CellStyle style = boldStyle(workbook);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }


    private String getCauseOfReturnOrCancelOrder(OrderEntity order) {
        if (OrderConfig.STATUS_400 <= order.getStatus() && OrderConfig.STATUS_600 > order.getStatus()) {
            int prefix = order.getStatus() / 100;
            switch (prefix) {
                case OrderConfig.PREFIX_CANCEL:
                    OrderHistory history = getHistory(order.getId(), "cancel");
                    return history == null ? "" : ("null".equals(history.getMessage())? "" : history.getMessage());
                case OrderConfig.PREFIX_RETURN:
                    OrderHistory history2 = getHistory(order.getId(), "confirm_return");
                    return history2 == null ? "" : ("null".equals(history2.getMessage())? "" : history2.getMessage());
                default:
                    return "";
            }
        }
        return "";
    }

    private OrderHistory getHistory (long orderId, String action){
        String url = apiExchangeService.createUrlWithToken(httpRequest,"order", "get-order-history");
        url += "&order-id="+ orderId + "&action=" + action;
        return apiExchangeService.<OrderHistory>get(httpRequest, url, new TypeReference<RepositoryResponse<OrderHistory>>(){}).getData();
    }

}
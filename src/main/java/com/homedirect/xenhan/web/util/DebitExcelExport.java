package com.homedirect.xenhan.web.util;
/* author: minhhieu */

import com.homedirect.xenhan.model.Order;
import com.homedirect.xenhan.model.ShopDebit;
import com.homedirect.xenhan.model.ShopPayment;
import com.homedirect.xenhan.model.SimpleShopDebit;
import com.homedirect.xenhan.user.model.Town;
import com.homedirect.xenhan.util.DateUtil;
import com.homedirect.xenhan.web.connection.ApiExchangeService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class DebitExcelExport {
  private Logger logger = LoggerFactory.getLogger(getClass());
  private List<SimpleShopDebit> debits;
  private XSSFWorkbook workbook;
  private HttpServletRequest httpRequest;
  private SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM HH:mm");

  private @Autowired ApiExchangeService apiExchangeService;

  private String[] HEADER = {"STT", "Từ", "Đến", "Loại đơn", "Mã đơn", "Ngày tạo",
                            "Tên khách hàng", "Địa chỉ giao", "Tiền hàng", "Phí ship", "Công nợ", "Thực tế thanh toán"};

  public void export(HttpServletRequest httpRequest, HttpServletResponse response, List<SimpleShopDebit> debits) throws Exception {
    try {
      this.debits = debits;
      this.workbook = new XSSFWorkbook();
      this.httpRequest = httpRequest;

      XSSFSheet sheet = workbook.createSheet("DanhSachDonHang");
      this.columnWidthSettings(sheet);
      this.createDataContent(sheet, 0);

      OutputStream out = response.getOutputStream();
      workbook.write(out);
      out.close();
      logger.info("=====> Done export");

    } catch (Exception e) {
      logger.error(e.getMessage(), e);
    }
  }

  private void createDataContent(XSSFSheet sheet, int startRow) {
    createTableContentHeader(sheet, startRow);
    for (int i = 0; i < debits.size(); i++) {
      SimpleShopDebit simpleDebit = debits.get(i);
      int rowIndex = startRow + 1 + i;
      Row row = sheet.createRow(rowIndex);
      createDebitRowData(row, simpleDebit, i + 1);
    }
  }

  private void createDebitRowData(Row row, SimpleShopDebit simpleDebit, int index) {
    CellStyle tdCenterStyle = tdCenterTableStyle(workbook);
    CellStyle tdLeftStyle = tdLeftTableStyle(workbook);
    CellStyle tdRightStyle = tdRightTableStyle(workbook);

    ShopDebit shopDebit = simpleDebit.getShopDebit();
    ShopPayment shopPayment = simpleDebit.getShopPayment();
    Order order = shopPayment.getOrder();

    createCell(row, 0, String.valueOf(index), tdCenterStyle);
    createCell(row, 1, DateUtil.formatDDMMYYYY(shopDebit.getStartDate()), tdLeftStyle);
    createCell(row, 2, DateUtil.formatDDMMYYYY(shopDebit.getEndDate()), tdLeftStyle);
    createCell(row, 3, order.isCOD() ? "COD" : "Ứ.T", tdCenterStyle);
    createCell(row, 4, String.valueOf(order.getId()), tdCenterStyle);
    createCell(row, 5, DateUtil.formatDDMMYYYY(order.getCreatedDate()), tdLeftStyle);
    createCell(row, 6, order.getDropoff().getContact().getName(), tdLeftStyle);
    Town town = order.getDropoff().getTown();
    createCell(row, 7, order.getDropoff().getAddress() + ", " + town.getDistrict().getName(), tdLeftStyle);
    createCell(row, 8, order.getGoodAmount(), tdRightStyle);
    createCell(row, 9, order.getShipAmount(), tdRightStyle);
    createCell(row, 10, shopPayment.getDebit(), tdRightStyle);
    createCell(row, 11, DateUtil.formatDDMMYYYY(shopDebit.getRealPaymentDate()), tdLeftStyle);
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


  public static CellStyle tdLeftTableStyle(XSSFWorkbook workbook) {
    CellStyle style = normalStyle(workbook);
    style.setBorderBottom(BorderStyle.THIN);
    style.setBorderRight(BorderStyle.THIN);
    style.setBorderTop(BorderStyle.THIN);
    style.setBorderLeft(BorderStyle.THIN);
    style.setAlignment(HorizontalAlignment.LEFT);
    return style;
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

  private void columnWidthSettings(XSSFSheet sheet) {
    for (int i = 1; i < 30; i++) {
      sheet.setColumnWidth(i, 3000);
    }
  }


  private void createTableContentHeader(XSSFSheet sheet, int startRow) {
    CellStyle thStyle = thTableStyle(workbook);
    Row headerRow = sheet.createRow(startRow);
    for (int i = 0; i < HEADER.length; i++) {
      createCell(headerRow, i, HEADER[i], thStyle);
    }
  }

  private void createCell(Row row, int position, String value, CellStyle cellStyle) {
    Cell cell = row.createCell(position);
    cell.setCellStyle(cellStyle);
    cell.setCellValue(value);
  }

  private void createCell(Row row, int position, double value, CellStyle cellStyle) {
    Cell cell = row.createCell(position);
    cell.setCellStyle(cellStyle);
    cell.setCellValue(value);
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

}

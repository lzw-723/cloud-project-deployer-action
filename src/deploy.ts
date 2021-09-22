import axios from 'axios';
import formData from 'form-data';
import { getEndPoint, getReqHeaders } from './utils';

const deploy = async ({
  serviceId,
  token,
  payload,
  changelog,
}: {
  serviceId: string;
  token: string;
  payload: Buffer;
  changelog: string;
}): Promise<{ version: string; cloudProjectUrl: string }> => {
  const form = new formData();
  form.append('file', payload);
  form.append('change_log', changelog);
  form.append('type', 'file');

  const url = getEndPoint(serviceId);
  const baseHeaders = getReqHeaders(token);

  try {
    const {
      data: { version, invoke_url },
    } = await axios.post(url, form, {
      headers: {
        ...baseHeaders,
        ...form.getHeaders(),
      },
    });

    return {
      version,
      cloudProjectUrl: invoke_url,
    };
  } catch (e) {
    const error = e.response?.data?.error;
    if (error) {
      if (error.err_code === 10002) {
        throw new Error(
          `The token is invalid. Please make sure your token has the correct scope.`,
        );
      }

      throw new Error(
        `Deploy request failed: ${JSON.stringify(e.response?.data?.error)}`,
      );
    }
    throw new Error(`Deploy request failed: ${e}`);
  }
};

export default deploy;
